import express from "express";
import prisma from "../lib/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, password, email, role } = req.body;

    const existing = await prisma.users.findUnique({
      where: { user_email: email },
    });

    if (existing) {
      return res.status(404).json({ message: "Email đã tồn tại" });
    }

    const hashed = await bcrypt.hash(password, 12);

    await prisma.users.create({
      data: {
        user_first_name: firstName,
        user_last_name: lastName,
        user_email: email,
        user_password: hashed,
        user_role: role,
      },
    });

    res.json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({
      where: { user_email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại" });
    }

    const match = await bcrypt.compare(password, user.user_password);

    if (!match) {
      return res.status(404).json({ message: "Mật khẩu không đúng" });
    }

    const token = jwt.sign(
      {
        id: user.user_id.toString(),
        email: user.user_email,
        firstName: user.user_first_name,
        lastName: user.user_last_name,
        role: user.user_role,
      },
      "288918912ukjduiujhduiiuewjk18" // <--- SECRET_KEY
    );

    res.json({
      message: "Đăng nhập thành công",
      token,
      id: user.user_id.toString(),
      firstName: user.user_first_name,
      lastName: user.user_last_name,
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
