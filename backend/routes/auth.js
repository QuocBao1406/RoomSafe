import express from "express";
import prisma from "../lib/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router =  express.Router();


router.post("/register", async (req, res) => {
    try {
        const { username, password, email, role } = req.body;

        const existing = await prisma.users.findUnique({
            where: { user_name: username, user_email: email },
        });

        if ( existing ) {
            return res.status(404).json({ message: "Username đã tồn tại"});
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
            data: { user_name: username, user_email: email, user_password: hashed, user_role: role },
        });

        res.json({ message: "Đăng ký thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await prisma.users.findUnique({
            where: { user_name: username },
        });

        if ( !user ) {
            return res.status(404).json({ message: "username không tồn tại"});
        };

        const match = await bcrypt.compare(password, user.user_password);

        if ( !match ) {
            return res.status(404).json({ message: "Mật khẩu không đúng"});
        }

        const token = jwt.sign({ id: user.user_id.toString() }, "SECRET_KEY");

        res.json({ message: "Đăng nhập thành công",
            token,
            id: user.user_id.toString(),
            username: user.user_name,
            name: user.user_full_name || user.user_name,
            email: user.user_email,
            avatar: user.user_avatar || null,
            role: user.user_role,
        });

        console.log("Đăng nhập thành công");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

export default router;