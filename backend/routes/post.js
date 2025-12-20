import express from 'express';
import prisma from "../lib/db.js";
import upload from "../lib/upload.js";

const router = express.Router();

// lay tin dang cua user cu the
router.get("/user/:id", async(req,res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({message: "Thiếu user ID"});
        }

        const posts = await prisma.posts.findMany({
            where: {
                user_id: BigInt(userId)
            },
            include: {
                images: true
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        const safePosts = posts.map(post => ({
            ...post,
            user_id: post.user_id.toString(),
            thumbnail: post.images.length > 0 ? post.images[0].image_url : null,
        }));

        res.status(200).json({data: safePosts});
    } catch (error) {
        console.error("Lỗi lấy danh sách bài đăng:", error);
        res.status(500).json({ message: "Lỗi server khi tải danh sách bài đăng "});
    }
});

// up toi da 10 anh
router.post("/create", async (req, res) => {
    upload.array('images', 10)(req,res, async (err ) => {
        if(err) {
            console.error("Lỗi upload ảnh:", err);
            return res.status(500).json({message: "Lỗi khi upload ảnh: " + err.message});
        }
        try {
            // lay du lieu tu form
            const {
                title, description, price, area,
                address, district, city, ward,
                category, user_id,
                price_electricity, price_water, price_internet, expire_duration,
            } = req.body;

            const imageFiles = req.files;

            const durationDays = parseInt(expire_duration) || 7;
            const expiredDate = new Date();
            expiredDate.setDate(expiredDate.getDate() + durationDays);

            console.log("Dữ liệu body: ", req.body);
            console.log("file ảnh: ", imageFiles);

            // lay link anh tu Cloudinary tra ve
            if(!imageFiles || imageFiles.length === 0) {
                return res.status(400).json({ message: "vui lòng chọn ít nhất 1 ảnh!"});
            }

            const userIdNum = Number(user_id);

            if(!userIdNum || isNaN(userIdNum)) {
                return res.status(400).json({ message: "user_id không hợp lệ!"});
            }

            // luu vao database
            const newPost = await prisma.posts.create({
                data: {
                    post_title: title,
                    post_description: description,
                    post_price: parseInt(price),
                    post_area: parseFloat(area),
                    post_address: address,
                    post_district: district,
                    post_city: city,
                    post_ward: ward || "",
                    category: category,
                    price_electricity: parseInt(price_electricity),
                    price_water: parseInt(price_water) || 0,
                    price_internet: parseInt(price_internet) || 0,
                    expired_at: expiredDate,

                    user_id: BigInt(userIdNum),

                    images: {
                        create: imageFiles.map(file => ({
                            image_url: file.path
                        }))
                    }
                }
            });

            const responseData = {
                ...newPost,
                user_id: newPost.user_id.toString(),
                post_id: newPost.post_id
            }

            res.status(200).json({
                message: "Đăng tin thành công!",
                postId: newPost.post_id,
            });
        } catch(error) {
            console.error("Lỗi cụ thể:", error);
            console.error("Lỗi Server:", JSON.stringify(error, null, 2));
            if(Object.keys(error).length === 0) console.error(error);

            res.status(500).json({ message: "Lỗi server: " + error.message });
        }
    })
})

router.delete("/delete/:id", async (req, res) => {
    try {
        const postId = parseInt(req.params.id);

        if (isNaN(postId)) {
            return res.status(400).json({message: "Id bài viết không hợp lệ"});
        }

        const existingPost = await prisma.posts.findUnique({
            where: {post_id: postId}
        });

        if(!existingPost) {
            return res.status(404).json({message: "Bài viết không tồn tại!"});
        }

        await prisma.posts.delete({
            where: {
                post_id: postId
            }
        })

        res.status(200).json({message: "Xóa bài viết thành công"})
    } catch (error) {
        console.error("Lỗi xóa bài: ", error);
        res.status(500).json({message: "Lỗi server: " + error.message})
    }
})

router.get("/detail/:id", async (req, res) => {
    try {
        const postId = parseInt(req.params.id);

        if (isNaN(postId)) {
            return res.status(400).json({message: "ID không hợp lệ"});
        }

        const post = await prisma.posts.findUnique({
            where: { post_id: postId },
            include: {images: true}
        });

        if (!post) return res.status(404).json({message: "Không tìm thấy bài viết"});

        const safePost = {
            ...post,
            user_id: post.user_id.toString(),
        };

        res.status(200).json({data: safePost});
    } catch (error) {
        res.status(500).json({message: "Lỗi sever"});
    }
});

router.put("/update/:id", upload.array('images', 10), async (req, res) => {
    try {
        const postId = parseInt(req.params.id);

        const {
            title, description, price, area,
            address, district, city, ward,
            category, price_electricity, price_water, price_internet,
        } = req.body;

        const updateData = {
            post_title: title,
            post_description: description,
            post_price: parseInt(price),
            post_area: parseFloat(area),
            post_address: address,
            category: category,
            price_electricity: parseInt(price_electricity || 0),
            price_water: parseInt(price_water || 0),
            price_internet: parseInt(price_internet || 0),
        };

        await prisma.posts.update({
            where: {post_id: postId},
            data: updateData
        });

        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => ({
                post_id: postId,
                image_url: file.path
            }));

            await prisma.postImages.createMany({
                data: newImages
            });
        }

        res.status(200).json({message: "Cập nhật thành công!"});
    } catch (error) {
        console.error("Lỗi update: ", error);
        res.status(500).json({message: "Lỗi update: " + error.message});
    }
});

router.put("/update-status/:id", async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const {status} = req.body;

        if(!status) {
            return res.status(400).json({success: false, message: "Thiếu trạng thái (status)"});
        }

        const updatePost = await prisma.posts.update({
            where: {
                post_id: postId
            },
            data: {
                status: status,
            }
        });

        return res.status(200).json({
            success: true,
            message: "Cập nhật trạng thái thành công!",
            data: updatePost,
        })
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy bài đăng này.",
            });
        }

        console.error("Lỗi update Prisma:", error);

        return res.status(500).json({
            success: false,
            message: "Lỗi server khi cập nhật trạng thái.",
        });
    }
});

router.get("/public", async (req, res) => {
    try {
        const posts = await prisma.posts.findMany({
            where: {
                status: 'AVAILABLE',
                expired_at: {
                    gt: new Date()
                }
            },
            include: {
                images: true,
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        const safePosts = posts.map(post => ({
            ...post,
            user_id: post.user_id.toString(),
            thumbnail: post.images.length > 0 ? post.images[0].image_url : null,
        }));

        res.status(200).json({ data: safePosts });
    } catch (error) {
        console.error("Lỗi lấy danh sách public:", error);
        res.status(500).json({ message: "Lỗi server khi tải danh sách bài đăng" });
    }
});

export default router;