import express from "express";
import prisma from "../lib/db.js";
import { verifyToken } from "../lib/middleware.js";

const router = express.Router();

// --- MIDDLEWARE CHECK QUYỀN ADMIN ---
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, async () => {
    try {
      const userId = req.user?.id || req.user?.user_id;
      let userRole = req.user?.role || req.user?.user_role;

      // Fallback: Nếu token thiếu role, lấy từ DB
      if (!userRole && userId) {
        const userInDb = await prisma.users.findUnique({
          where: { user_id: BigInt(userId) },
          select: { user_role: true }
        });
        if (userInDb) userRole = userInDb.user_role;
      }

      if (userRole && userRole.toUpperCase() === "ADMIN") {
        next();
      } else {
        return res.status(403).json({ message: "Yêu cầu quyền Admin" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Lỗi xác thực" });
    }
  });
};
router.use(verifyAdmin);

// --- API THỐNG KÊ ---
router.get("/stats/counts", async (req, res) => {
  try {
    const userCount = await prisma.users.count();
    const postCount = await prisma.posts.count({ where: { category: { not: "O_GHEP" } } });
    const roommateCount = await prisma.posts.count({ where: { category: "O_GHEP" } });
    res.json({ success: true, data: { users: userCount, posts: postCount, roommates: roommateCount } });
  } catch (error) { res.status(500).json({ message: "Lỗi server" }); }
});

router.get("/stats/recent-users", async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      take: 5, orderBy: { user_created_at: "desc" }
    });
    // Map dữ liệu để frontend dễ dùng
    const safeUsers = users.map((u) => ({
      user_id: u.user_id.toString(),
      user_first_name: u.user_first_name,
      user_last_name: u.user_last_name,
      user_email: u.user_email,
      user_avatar: u.user_avatar,
      user_role: u.user_role,
      user_created_at: u.user_created_at
    }));
    res.json({ success: true, data: safeUsers });
  } catch (error) { res.status(500).json({ message: "Lỗi server" }); }
});

router.get("/stats/recent-posts", async (req, res) => {
  try {
    const posts = await prisma.posts.findMany({
      take: 5, orderBy: { created_at: "desc" },
      include: { user: { select: { user_first_name: true, user_last_name: true } } }
    });
    // Map dữ liệu
    const safePosts = posts.map((p) => ({
      post_id: p.post_id,
      title: p.post_title,
      price: p.post_price,
      created_at: p.created_at,
      status: p.status,
      category: p.category,
      author: `${p.user?.user_last_name || ""} ${p.user?.user_first_name || ""}`.trim() || "Ẩn danh"  // --> Tên viết Việt nên viết ngược lại
    }));
    res.json({ success: true, data: safePosts });
  } catch (error) { res.status(500).json({ message: "Lỗi server" }); }
});

// --- API QUẢN LÝ POSTS (SỬA LỖI HIỂN THỊ TẠI ĐÂY) ---
router.get("/posts", async (req, res) => {
  try {
    const posts = await prisma.posts.findMany({
      orderBy: { created_at: "desc" },
      include: {
        user: { select: { user_first_name: true, user_last_name: true, user_email: true } }, // Lấy tên + email người đăng
        images: true // QUAN TRỌNG: Lấy bảng ảnh liên kết
      }
    });

    // Map dữ liệu từ DB (snake_case) sang Frontend (camelCase)
    const safePosts = posts.map((p) => ({
      post_id: p.post_id,
      user_id: p.user_id.toString(),
      
      // Map các trường quan trọng
      title: p.post_title,          // Frontend gọi .title
      address: p.post_address,
      district: p.post_district,    // Frontend gọi .district
      city: p.post_city,            // Frontend gọi .city
      price: p.post_price,          // Frontend gọi .price
      status: p.status,
      category: p.category,
      created_at: p.created_at,

      // Lấy ảnh đầu tiên làm thumbnail
      thumbnail: p.images && p.images.length > 0 ? p.images[0].image_url : null,

      // Thông tin tác giả
      author: `${p.user?.user_last_name || ""} ${p.user?.user_first_name || ""}`.trim() || "Ẩn danh",
      author_email: p.user?.user_email
    }));

    res.json({ success: true, data: safePosts });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.posts.delete({ where: { post_id: id } });
    res.json({ success: true, message: "Đã xóa bài đăng" });
  } catch (error) { res.status(500).json({ message: "Lỗi xóa bài đăng" }); }
});

router.put("/posts/:id/status", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { status } = req.body;
        const updated = await prisma.posts.update({
            where: { post_id: id },
            data: { status }
        });
        res.json({ success: true, data: { ...updated, post_id: updated.post_id } });
    } catch (error) { res.status(500).json({ message: "Lỗi cập nhật trạng thái" }); }
});

// --- API QUẢN LÝ USERS ---
router.get("/users", async (req, res) => {
  try {
    const users = await prisma.users.findMany({ orderBy: { user_created_at: "desc" } });
    const safeUsers = users.map((u) => ({
      ...u,
      user_id: u.user_id.toString()
    }));
    res.json({ success: true, data: safeUsers });
  } catch (error) { res.status(500).json({ message: "Lỗi server" }); }
});

router.put("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const updateData = {};
    if (data.first_name) updateData.user_first_name = data.first_name;
    if (data.last_name) updateData.user_last_name = data.last_name;
    if (data.phone) updateData.user_phone = data.phone;
    if (data.address) updateData.user_address = data.address;
    if (data.role) updateData.user_role = data.role;
    if (data.verification) updateData.user_verification = data.verification;

    await prisma.users.update({ where: { user_id: BigInt(id) }, data: updateData });
    res.json({ success: true, message: "Cập nhật thành công" });
  } catch (error) { res.status(500).json({ message: "Lỗi cập nhật" }); }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.users.delete({ where: { user_id: BigInt(id) } });
    res.json({ success: true, message: "Đã xóa người dùng" });
  } catch (error) { res.status(500).json({ message: "Lỗi xóa người dùng" }); }
});

export default router;