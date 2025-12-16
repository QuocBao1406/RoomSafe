import express from "express";
import prisma from "../lib/db.js";
import upload from "../lib/upload.js";

const router = express.Router();

const mapRoommate = (post) => ({
  ...post,
  user_id: post.user_id?.toString() || null,
});

// Create roommate post
router.post("/", (req, res) => {
  upload.array("photos", 8)(req, res, async (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ message: "Lỗi upload ảnh: " + err.message });
    }

    try {
      const {
        title,
        description,
        budget,
        preferred_area,
        gender_preference,
        age_min,
        age_max,
        habits,
        contact_zalo,
        contact_messenger,
        contact_phone,
        user_id,
      } = req.body;

      if (!user_id) return res.status(400).json({ message: "Thiếu user_id" });
      if (!title || !description || !budget || !preferred_area) {
        return res.status(400).json({ message: "Thiếu trường bắt buộc" });
      }

      const photos = (req.files || []).map((f) => f.path);

      const newPost = await prisma.roommatePost.create({
        data: {
          title,
          description,
          budget: parseInt(budget),
          preferred_area,
          gender_preference: gender_preference || "ANY",
          age_min: age_min ? parseInt(age_min) : null,
          age_max: age_max ? parseInt(age_max) : null,
          habits: habits || null,
          contact_zalo: contact_zalo || null,
          contact_messenger: contact_messenger || null,
          contact_phone: contact_phone || null,
          photos,
          user_id: BigInt(user_id),
        },
      });

      res.status(201).json({
        message: "Tạo bài thành công",
        data: mapRoommate(newPost),
      });
    } catch (error) {
      console.error("Create roommate error:", error);
      res.status(500).json({ message: "Lỗi server: " + error.message });
    }
  });
});

// Public list with filters
router.get("/public", async (req, res) => {
  try {
    const {
      area,
      gender,
      budgetMin,
      budgetMax,
      ageMin,
      ageMax,
      q,
      exclude,
    } = req.query;

    const where = {
      status: "ACTIVE",
    };

    if (area) {
      where.preferred_area = { contains: area, mode: "insensitive" };
    }

    if (gender && ["MALE", "FEMALE", "ANY"].includes(gender)) {
      where.gender_preference = gender;
    }

    if (budgetMin || budgetMax) {
      where.budget = {};
      if (budgetMin) where.budget.gte = parseInt(budgetMin);
      if (budgetMax) where.budget.lte = parseInt(budgetMax);
    }

    if (ageMin || ageMax) {
      where.AND = [
        ageMin ? { age_min: { gte: parseInt(ageMin) } } : {},
        ageMax ? { age_max: { lte: parseInt(ageMax) } } : {},
      ].filter((c) => Object.keys(c).length);
    }

    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ];
    }

    if (exclude) {
      const exId = parseInt(exclude);
      if (!isNaN(exId)) {
        where.id = { not: exId };
      }
    }

    const posts = await prisma.roommatePost.findMany({
      where,
      orderBy: { created_at: "desc" },
    });

    res.status(200).json({ data: posts.map(mapRoommate) });
  } catch (error) {
    console.error("List roommate error:", error);
    res.status(500).json({ message: "Lỗi server khi tải danh sách" });
  }
});

// Detail
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID không hợp lệ" });

    const post = await prisma.roommatePost.findUnique({
      where: { id },
    });

    if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });

    res.status(200).json({ data: mapRoommate(post) });
  } catch (error) {
    console.error("Detail error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// My posts
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await prisma.roommatePost.findMany({
      where: { user_id: BigInt(userId) },
      orderBy: { created_at: "desc" },
    });
    res.status(200).json({ data: posts.map(mapRoommate) });
  } catch (error) {
    console.error("My roommate posts error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Update
router.put("/:id", (req, res) => {
  upload.array("photos", 8)(req, res, async (err) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ message: "Lỗi upload ảnh: " + err.message });
    }

    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: "ID không hợp lệ" });

      const {
        title,
        description,
        budget,
        preferred_area,
        gender_preference,
        age_min,
        age_max,
        habits,
        contact_zalo,
        contact_messenger,
        contact_phone,
      } = req.body;

      const existing = await prisma.roommatePost.findUnique({ where: { id } });
      if (!existing) return res.status(404).json({ message: "Không tìm thấy bài viết" });

      const newPhotos = (req.files || []).map((f) => f.path);
      const mergedPhotos = Array.isArray(existing.photos)
        ? [...existing.photos, ...newPhotos]
        : newPhotos;

      const updated = await prisma.roommatePost.update({
        where: { id },
        data: {
          title: title ?? existing.title,
          description: description ?? existing.description,
          budget: budget ? parseInt(budget) : existing.budget,
          preferred_area: preferred_area ?? existing.preferred_area,
          gender_preference: gender_preference || existing.gender_preference,
          age_min: age_min ? parseInt(age_min) : existing.age_min,
          age_max: age_max ? parseInt(age_max) : existing.age_max,
          habits: habits !== undefined ? habits : existing.habits,
          contact_zalo: contact_zalo !== undefined ? contact_zalo : existing.contact_zalo,
          contact_messenger:
            contact_messenger !== undefined ? contact_messenger : existing.contact_messenger,
          contact_phone: contact_phone !== undefined ? contact_phone : existing.contact_phone,
          photos: mergedPhotos,
        },
      });

      res.status(200).json({ message: "Cập nhật thành công", data: mapRoommate(updated) });
    } catch (error) {
      console.error("Update roommate error:", error);
      res.status(500).json({ message: "Lỗi server: " + error.message });
    }
  });
});

// Update status
router.patch("/:id/status", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    if (!["ACTIVE", "FOUND", "CLOSED"].includes(status)) {
      return res.status(400).json({ message: "Trạng thái không hợp lệ" });
    }

    const updated = await prisma.roommatePost.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({ message: "Cập nhật trạng thái thành công", data: mapRoommate(updated) });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "ID không hợp lệ" });

    await prisma.roommatePost.delete({ where: { id } });
    res.status(200).json({ message: "Xóa bài viết thành công" });
  } catch (error) {
    console.error("Delete roommate error:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

export default router;