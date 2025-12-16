// backend/lib/middleware.js

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // 1. Lấy token từ cookie hoặc header
  const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Bạn chưa đăng nhập!" });
  }

  // 2. Kiểm tra token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Token không hợp lệ hoặc đã hết hạn!" });
    }
    
    // 3. Lưu thông tin user vào req để dùng ở các hàm sau
    req.user = user;
    next();
  });
};