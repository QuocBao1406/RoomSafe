// backend/controllers/userController.js
import prisma from "../lib/db.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// --- CẤU HÌNH MULTER (UPLOAD ẢNH) ---
const uploadDir = 'uploads/avatars';

// Tạo thư mục nếu chưa có
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Lưu vào thư mục uploads/avatars
    },
    filename: (req, file, cb) => {
        // Đặt tên file: user-{id}-{timestamp}.jpg
        // Lưu ý: req.user phải có từ middleware xác thực (verifyToken)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'user-' + req.user.id + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Chỉ được upload file ảnh!'));
        }
    }
});

// Export middleware upload (Dùng export const thay vì exports.)
export const uploadAvatar = upload.single('avatar'); 

// --- CÁC HÀM XỬ LÝ LOGIC ---

// 1. Lấy thông tin
export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id; 
        const user = await prisma.users.findUnique({
            where: { user_id: BigInt(userId) },
            select: {
                user_id: true, user_name: true, user_email: true, user_full_name: true,
                user_phone: true, user_address: true, user_gender: true, user_birthday: true,
                user_bio: true, user_avatar: true, user_role: true, user_created_at: true,
                user_avg_rating: true
            }
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        // Xử lý đường dẫn ảnh
        let avatarUrl = user.user_avatar;
        if (avatarUrl && !avatarUrl.startsWith('http')) {
            avatarUrl = `${process.env.BASE_URL || 'http://localhost:5000'}/${avatarUrl}`;
        }

        // Chuyển BigInt sang string để không lỗi JSON
        const formattedUser = {
            ...user,
            user_id: user.user_id.toString(),
            user_avatar: avatarUrl 
        };

        res.status(200).json({ success: true, data: formattedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
};

// 2. Cập nhật thông tin
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Dữ liệu text
        const { fullName, phone, address, gender, birthday, bio } = req.body;
        
        let updateData = {
            user_full_name: fullName,
            user_phone: phone,
            user_address: address,
            user_gender: gender,
            user_birthday: birthday ? new Date(birthday) : null,
            user_bio: bio
        };

        // Nếu có file ảnh được upload
        if (req.file) {
            updateData.user_avatar = req.file.path.replace(/\\/g, "/"); 
        }

        await prisma.users.update({
            where: { user_id: BigInt(userId) },
            data: updateData
        });

        const newAvatarUrl = req.file 
            ? `${process.env.BASE_URL || 'http://localhost:5000'}/${updateData.user_avatar}` 
            : null;

        res.status(200).json({ 
            success: true, 
            message: "Cập nhật thành công!",
            newAvatar: newAvatarUrl
        });

    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ success: false, message: "Lỗi cập nhật" });
    }
};