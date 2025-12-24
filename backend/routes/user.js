import express from 'express';
import prisma from "../lib/db.js";
import { verifyToken } from '../lib/middleware.js';
import upload from '../lib/upload.js';

const router = express.Router();

router.get('/profile', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await prisma.users.findUnique({
            where: { user_id: BigInt(userId) },
            select: {
                user_id: true, user_email: true, user_first_name: true, user_last_name: true,
                user_phone: true, user_address: true, user_gender: true, user_birthday: true,
                user_bio: true, user_avatar: true, user_role: true, user_created_at: true,
                user_avg_rating: true
            }
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        let avatarUrl = user.user_avatar;
        if (avatarUrl && !avatarUrl.startsWith('http')) {
             const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
             avatarUrl = `${baseUrl}/${avatarUrl}`;
        }

        const formattedUser = {
            ...user,
            user_id: user.user_id.toString(),
            user_avatar: avatarUrl 
        };

        res.status(200).json({ success: true, data: formattedUser });
    } catch (error) {
        console.error("Lỗi lấy profile:", error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
});

router.put('/profile', verifyToken, upload.single('avatar'), async (req, res) => {
    try {
        const userId = req.user.id;
        const { firstName, lastName, phone, address, gender, birthday, bio } = req.body;
        
        let updateData = {
            user_first_name: firstName,
            user_last_name: lastName,
            user_phone: phone,
            user_address: address,
            user_gender: gender,
            user_birthday: birthday ? new Date(birthday) : null,
            user_bio: bio
        };

        if (req.file) {
            updateData.user_avatar = req.file.path; 
        }

        await prisma.users.update({
            where: { user_id: BigInt(userId) },
            data: updateData
        });

        res.status(200).json({ 
            success: true, 
            message: "Cập nhật thành công!",
            newAvatar: updateData.user_avatar || null
        });

    } catch (error) {
        console.error("Lỗi cập nhật profile:", error);
        res.status(500).json({ success: false, message: "Lỗi cập nhật" });
    }
});

export default router;