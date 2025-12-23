import express from 'express';
import prisma from "../lib/db.js";
import { verifyToken } from '../lib/middleware.js';
import upload from '../lib/upload.js'; 

const router = express.Router();

router.get("/detail/:id", async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        if (isNaN(postId)) return res.status(400).json({ message: "ID không hợp lệ" });

        const post = await prisma.posts.findUnique({
            where: { post_id: postId },
            include: {
                roommate_details: true,
                images: true,
                user: {
                    select: {
                        user_id: true,
                        user_full_name: true,
                        user_avatar: true,
                        user_phone: true,
                        user_address: true, // Lấy thêm địa chỉ chủ trọ nếu cần
                        user_email: true
                    }
                }
            }
        });

        if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });

        // MAP DỮ LIỆU ĐẦY ĐỦ
        const safePost = {
            id: post.post_id,
            title: post.post_title,
            description: post.post_description,
            
            // Tài chính
            budget: post.post_price, // Ngân sách / Giá phòng
            
            // Địa chỉ chi tiết (QUAN TRỌNG: Nối chuỗi để hiển thị đầy đủ)
            full_address: [post.post_address, post.post_ward, post.post_district, post.post_city]
                          .filter(Boolean).join(', '), // Lọc bỏ giá trị null và nối lại
            
            // Các trường lẻ để breadcrumb dùng
            district: post.post_district,
            city: post.post_city,
            area: post.post_area,

            // Dịch vụ
            price_electricity: post.price_electricity,
            price_water: post.price_water,
            price_internet: post.price_internet,

            // Thông tin Roommate (Bảng phụ)
            gender_preference: post.roommate_details?.gender_partner || 'ANY',
            age_min: post.roommate_details?.age_range_min,
            age_max: post.roommate_details?.age_range_max,
            career: post.roommate_details?.career,
            habits: post.roommate_details?.habits,
            hobbies: post.roommate_details?.hobbies,
            shared_cost: post.roommate_details?.shared_cost,

            // Metadata
            created_at: post.created_at,
            expired_at: post.expired_at, // THÊM NGÀY HẾT HẠN
            status: post.status,

            // User Info
            user: {
                user_id: post.user.user_id.toString(),
                user_full_name: post.user.user_full_name,
                user_avatar: post.user.user_avatar,
                user_joined: post.user.user_created_at // Nếu có trường này
            },
            contact_phone: post.user.user_phone,
            
            photos: post.images.map(img => img.image_url) 
        };

        res.status(200).json({ success: true, data: safePost });

    } catch (error) {
        console.error("Lỗi lấy chi tiết:", error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
});

// --- 1. ĐĂNG TIN MỚI (Giữ nguyên logic của bạn) ---
router.post('/create', verifyToken, upload.array('images', 5), async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            title, description, price, area, address, 
            city, district, ward,
            priceElectricity, priceWater, priceInternet,
            duration, 
            genderPartner, career, habits, hobbies, sharedCost,
            ageMin, ageMax, 
            category = 'O_GHEP' 
        } = req.body;

        const parseIntSafe = (val) => (!val || val === '' || isNaN(val)) ? null : parseInt(val);

        let expiredAt = null;
        if (duration) {
            const days = parseInt(duration);
            if (!isNaN(days)) {
                const date = new Date();
                date.setDate(date.getDate() + days);
                expiredAt = date; 
            }
        }

        let imageData = [];
        if (req.files && req.files.length > 0) {
            imageData = req.files.map(file => ({ image_url: file.path }));
        }

        const newPost = await prisma.posts.create({
            data: {
                post_title: title,
                post_description: description,
                post_price: parseIntSafe(price) || 0,
                post_area: parseFloat(area) || 0,
                post_address: address,
                post_city: city,
                post_district: district,
                post_ward: ward || '', 
                
                price_electricity: parseIntSafe(priceElectricity),
                price_water: parseIntSafe(priceWater),
                price_internet: parseIntSafe(priceInternet),

                category: category,
                status: 'AVAILABLE',
                user_id: BigInt(userId),
                expired_at: expiredAt,

                roommate_details: {
                    create: {
                        gender_partner: genderPartner || 'ALL',
                        age_range_min: parseIntSafe(ageMin),
                        age_range_max: parseIntSafe(ageMax),
                        career: career,
                        habits: habits,
                        hobbies: hobbies,
                        shared_cost: sharedCost 
                    }
                },

                images: { create: imageData }
            }
        });

        // Convert BigInt -> String để tránh lỗi JSON
        const result = { ...newPost, user_id: newPost.user_id.toString() };

        res.status(201).json({ success: true, message: "Đăng tin thành công!", data: { postId: result.post_id } });

    } catch (error) {
        console.error("Lỗi đăng tin:", error);
        res.status(500).json({ success: false, message: "Lỗi server: " + error.message });
    }
});

router.get('/public', async (req, res) => {
    try {
        const { 
            keyword, city, district, 
            priceMin, priceMax, 
            gender, career, ageMin, ageMax, 
            habits 
        } = req.query;

        // Xây dựng câu truy vấn dynamic
        const whereClause = {
            category: 'O_GHEP',
            status: 'AVAILABLE',
        };

        // 1. Lọc cơ bản (Posts)
        if (keyword) {
            whereClause.OR = [
                { post_title: { contains: keyword } }, // Bỏ mode: 'insensitive' nếu dùng MySQL
                { post_address: { contains: keyword } }
            ];
        }
        if (city) whereClause.post_city = city;
        if (district) whereClause.post_district = district;
        
        if (priceMin || priceMax) {
            whereClause.post_price = {};
            if (priceMin) whereClause.post_price.gte = parseInt(priceMin);
            if (priceMax) whereClause.post_price.lte = parseInt(priceMax);
        }

        // 2. Lọc nâng cao (RoommateDetails)
        const detailsWhere = {};
        let hasDetailFilter = false;

        if (gender && gender !== 'ALL') {
            detailsWhere.gender_partner = gender;
            hasDetailFilter = true;
        }
        if (career) {
            detailsWhere.career = career;
            hasDetailFilter = true;
        }
        // Lọc tuổi (Tìm bài có yêu cầu tuổi bao trùm hoặc giao nhau)
        // Ở đây làm đơn giản: Tuổi user muốn tìm nằm trong khoảng yêu cầu của bài đăng
        if (ageMin) {
            detailsWhere.age_range_min = { lte: parseInt(ageMin) };
            hasDetailFilter = true;
        }
        if (ageMax) {
            detailsWhere.age_range_max = { gte: parseInt(ageMax) };
            hasDetailFilter = true;
        }
        // Lọc thói quen (Tìm text chứa từ khóa)
        if (habits) {
            // habits gửi lên dạng chuỗi ngăn cách phẩy: "Sạch sẽ,Yên tĩnh"
            const habitList = habits.split(',');
            detailsWhere.AND = habitList.map(h => ({
                habits: { contains: h }
            }));
            hasDetailFilter = true;
        }

        if (hasDetailFilter) {
            whereClause.roommate_details = {
                is: detailsWhere
            };
        }

        // Thực hiện Query
        const posts = await prisma.posts.findMany({
            where: whereClause,
            include: {
                roommate_details: true,
                images: true
            },
            orderBy: { created_at: 'desc' }
        });
        
        // Xử lý BigInt
        const safePosts = posts.map(p => ({...p, user_id: p.user_id.toString()}));
        
        res.status(200).json({ success: true, data: safePosts });
    } catch (error) {
        console.error("Lỗi filter:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

// --- 2. LẤY DANH SÁCH BÀI CỦA TÔI (GET /my-posts) ---
router.get('/my-posts', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const posts = await prisma.posts.findMany({
            where: {
                user_id: BigInt(userId),
                category: 'O_GHEP' // Chỉ lấy tin ở ghép
            },
            include: {
                roommate_details: true, // Lấy chi tiết (tuổi, giới tính...)
                images: true            // Lấy ảnh
            },
            orderBy: {
                created_at: 'desc'      // Tin mới nhất lên đầu
            }
        });

        // Xử lý BigInt cho từng bài viết
        const safePosts = posts.map(post => ({
            ...post,
            user_id: post.user_id.toString()
        }));

        res.status(200).json({ success: true, data: safePosts });

    } catch (error) {
        console.error("Lỗi lấy danh sách:", error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
});

// --- 3. XÓA BÀI ĐĂNG (DELETE /:id) ---
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = parseInt(req.params.id);

        // Kiểm tra bài viết tồn tại
        const post = await prisma.posts.findUnique({
            where: { post_id: postId }
        });

        if (!post) return res.status(404).json({ message: "Bài viết không tồn tại" });
        
        // Kiểm tra quyền sở hữu (user_id của bài phải trùng với user đang login)
        if (post.user_id.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Bạn không có quyền xóa bài này" });
        }

        // Thực hiện xóa
        await prisma.posts.delete({
            where: { post_id: postId }
        });

        res.status(200).json({ success: true, message: "Đã xóa bài viết" });

    } catch (error) {
        console.error("Lỗi xóa bài:", error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
});

// --- 4. CẬP NHẬT TRẠNG THÁI (PUT /:id/status) ---
// Dùng để Ẩn/Hiện tin
router.put('/:id/status', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = parseInt(req.params.id);
        const { status } = req.body; // 'AVAILABLE', 'HIDDEN', 'RENTED'

        const post = await prisma.posts.findUnique({ where: { post_id: postId } });
        
        if (!post || post.user_id.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Không có quyền thực hiện" });
        }

        const updatedPost = await prisma.posts.update({
            where: { post_id: postId },
            data: { status: status }
        });

        const safePost = { ...updatedPost, user_id: updatedPost.user_id.toString() };
        res.status(200).json({ success: true, message: "Cập nhật trạng thái thành công", data: safePost });

    } catch (error) {
        console.error("Lỗi update status:", error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
});

export default router;