import express from 'express';
import { PrismaClient } from '../generated/client/index.js';
import { verifyToken } from '../lib/middleware.js';

const router = express.Router();
const prisma = new PrismaClient();

BigInt.prototype.toJSON = function () { return this.toString() };

// 1. WEBHOOK (Nhận tiền từ SePay)
router.post('/webhook', async (req, res) => {
    try {
        const { content, referenceCode, transferAmount, gateway } = req.body;
        
        // FIX QUAN TRỌNG: SePay dùng 'transferAmount' thay vì 'amount'
        const amount = transferAmount || req.body.amount;

        console.log("🔔 Webhook:", content, amount);

        if (!amount) return res.status(400).json({ success: false, message: "Thiếu amount" });

        // Check trùng giao dịch
        const existingTx = await prisma.transactions.findUnique({
            where: { transaction_code: String(referenceCode) }
        });
        if (existingTx) return res.status(200).json({ success: true, message: "Đã xử lý" });

        // Lấy User ID từ nội dung "NAP 123"
        const match = content.match(/NAP\s*(\d+)/i);
        if (!match) return res.status(200).json({ success: true, message: "Sai cú pháp" });
        
        const userId = match[1];

        // Transaction DB
        await prisma.$transaction(async (tx) => {
            await tx.users.update({
                where: { user_id: BigInt(userId) },
                data: { account_balance: { increment: parseFloat(amount) } }
            });

            await tx.transactions.create({
                data: {
                    user_id: BigInt(userId),
                    amount: parseFloat(amount),
                    type: 'DEPOSIT',
                    status: 'SUCCESS',
                    payment_method: gateway || 'BANK',
                    transaction_code: String(referenceCode),
                    description: `Nạp tiền tự động: ${content}`
                }
            });
        });

        console.log(`✅ Cộng tiền thành công User ${userId}`);
        return res.status(200).json({ success: true, message: "Success" });

    } catch (error) {
        console.error("Webhook Error:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});

// 2. LỊCH SỬ GIAO DỊCH (Frontend gọi Poll liên tục vào đây)
router.get('/history', verifyToken, async (req, res) => {
    try {
        const userId = req.user.user_id || req.user.id; // Tùy vào token của bạn lưu gì
        
        const history = await prisma.transactions.findMany({
            where: { user_id: BigInt(userId) },
            orderBy: { created_at: 'desc' },
            take: 20
        });

        const formatted = history.map(item => ({
            ...item,
            transaction_id: item.transaction_id.toString(),
            user_id: item.user_id.toString(),
            amount: parseFloat(item.amount)
        }));

        return res.status(200).json({ error: 0, data: formatted });
    } catch (error) {
        return res.status(500).json({ error: 1, message: error.message });
    }
});

export default router;