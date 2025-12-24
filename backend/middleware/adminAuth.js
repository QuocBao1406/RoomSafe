import jwt from "jsonwebtoken";
import prisma from "../lib/db.js";

// Middleware kiểm tra Bearer token và role ADMIN
export const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, "288918912ukjduiujhduiiuewjk18");
    const user = await prisma.users.findUnique({
      where: { user_id: BigInt(decoded.id) },
      select: { user_id: true, user_role: true },
    });
    if (!user || user.user_role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.admin = user;
    next();
  } catch (error) {
    console.error("adminAuth error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default adminAuth;