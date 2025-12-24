import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "Chưa đăng nhập!" });

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
        console.error("LỖI NGUY HIỂM: Chưa cấu hình JWT_SECRET trong .env");
        return res.status(500).json({ message: "Lỗi cấu hình Server" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("=> Lỗi Verify:", err.message);
            return res.status(403).json({ message: "Token không hợp lệ hoặc hết hạn" });
        }
        
        // DEBUG: In ra nội dung Token để kiểm tra
        console.log("🔓 [Middleware] Decoded Token:", decoded);

        req.user = decoded;
        next();
    });
};