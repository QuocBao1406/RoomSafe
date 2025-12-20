import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Đảm bảo load biến môi trường ngay lập tức
dotenv.config(); 

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "Chưa đăng nhập!" });

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
        console.error("LỖI NGUY HIỂM: Chưa cấu hình JWT_SECRET trong .env");
        return res.status(500).json({ message: "Lỗi cấu hình Server" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("=> Lỗi Verify:", err.message);
            // Nếu lỗi là 'invalid signature' nghĩa là sai Secret
            return res.status(403).json({ message: "Token không hợp lệ" });
        }
        req.user = user;
        next();
    });
};