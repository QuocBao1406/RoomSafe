import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
// Đảm bảo bạn đã có GEMINI_API_KEY trong file .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/chat", async (req, res) => {
  try {
    const { message, role } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Cấu hình tính cách cho AI
    let systemPrompt = `
        Bạn là Trợ lý CSKH của RoomSafe. Nhiệm vụ của bạn là tư vấn ngắn gọn, dễ hiểu.
        
        QUY TẮC PHẢN HỒI:
        1. Mỗi câu trả lời ngắn gọn không quá 100 từ.
        2. Sử dụng dấu gạch đầu dòng (-) hoặc số thứ tự (1, 2, 3) để phân tách các ý.
        3. Sử dụng ký tự xuống dòng (\n) giữa các ý để tạo khoảng trống.
        4. In đậm các từ khóa quan trọng bằng cách đặt giữa cặp dấu sao (Ví dụ: **Hợp đồng**).
        5. Luôn kết thúc bằng một câu hỏi gợi mở hoặc lời chúc ngắn.
    `;

    // Tùy biến theo vai trò
    if (role === 'LANDLORD') {
        systemPrompt += `
        Khách hàng hiện tại là CHỦ TRỌ. 
        Hãy tư vấn về: Cách đăng tin hiệu quả, giá cả thị trường, quản lý người thuê, luật nhà ở.`;
    } else {
        systemPrompt += `
        Khách hàng hiện tại là NGƯỜI TÌM TRỌ. 
        Hãy tư vấn về: Cách tìm phòng an toàn, lưu ý khi ký hợp đồng, kiểm tra phòng.`;
    }

    // Gửi prompt + câu hỏi của user
    const result = await model.generateContent(`${systemPrompt}\n\nUser hỏi: ${message}`);
    const response = await result.response;
    const text = response.text();

    res.json({ success: true, reply: text });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: "AI đang bận, vui lòng thử lại sau." });
  }
});

export default router;