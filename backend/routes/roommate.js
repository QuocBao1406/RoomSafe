import express from 'express';
import prisma from "../lib/db.js";
import { verifyToken } from '../lib/middleware.js';
import upload from '../lib/upload.js'; 

const router = express.Router();

// --- LẤY CHI TIẾT BÀI ĐĂNG ---
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
                        user_first_name: true,
                        user_last_name: true,
                        user_avatar: true,
                        user_phone: true,
                        user_address: true,
                        user_email: true
                    }
                }
            }
        });

        if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết" });

        const safePost = {
            id: post.post_id,
            title: post.post_title,
            description: post.post_description,
            budget: post.post_price, 
            full_address: [post.post_address, post.post_ward, post.post_district, post.post_city].filter(Boolean).join(', '),
            district: post.post_district,
            city: post.post_city,
            area: post.post_area,
            price_electricity: post.price_electricity,
            price_water: post.price_water,
            price_internet: post.price_internet,
            gender_preference: post.roommate_details?.gender_partner || 'ANY',
            age_min: post.roommate_details?.age_range_min,
            age_max: post.roommate_details?.age_range_max,
            career: post.roommate_details?.career,
            habits: post.roommate_details?.habits,
            hobbies: post.roommate_details?.hobbies,
            shared_cost: post.roommate_details?.shared_cost,
            created_at: post.created_at,
            expired_at: post.expired_at,
            status: post.status,
            latitude: post.post_latitude,
            longitude: post.post_longitude,
            user: {
                user_id: post.user.user_id.toString(),
                user_first_name: post.user.user_first_name,
                user_last_name: post.user.user_last_name,
                user_avatar: post.user.user_avatar,
                user_joined: post.user.user_created_at
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

// Route: Tạo tin tìm bạn ở ghép (Roommate)
router.post('/create', verifyToken, upload.array('images', 5), async (req, res) => {
    try {
        const userId = req.user.id;
        
        // 1. Cấu hình bảng giá (Khớp với Frontend)
        const PRICE_CONFIG = {
            "7": 15000,
            "15": 25000,
            "30": 45000,
            "60": 80000 
        };

        const {
            title, description, price, area, address, 
            city, district, ward,
            priceElectricity, priceWater, priceInternet,
            duration, 
            genderPartner, career, habits, hobbies, sharedCost,
            ageMin, ageMax, 
            latitude, longitude,
            category = 'O_GHEP' 
        } = req.body;

        const parseIntSafe = (val) => (!val || val === '' || isNaN(val)) ? null : parseInt(val);

        // 2. Tính toán phí và ngày hết hạn
        const durationKey = String(duration || 30);
        const postFee = PRICE_CONFIG[durationKey] || 15000;
        const durationDays = parseInt(durationKey);

        const expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() + durationDays);

        // Xử lý ảnh
        let imageData = [];
        if (req.files && req.files.length > 0) {
            imageData = req.files.map(file => ({ image_url: file.path }));
        }

        // 3. Kiểm tra User và Số dư
        const user = await prisma.users.findUnique({
            where: { user_id: BigInt(userId) }
        });

        if (!user) return res.status(404).json({ message: "User không tồn tại" });

        const currentBalance = Number(user.account_balance || 0);
        
        // --- CHẶN NẾU THIẾU TIỀN ---
        if (currentBalance < postFee) {
            return res.status(400).json({
                success: false,
                message: `Số dư không đủ! Cần ${postFee.toLocaleString()}đ để đăng tin.`
            });
        }

        // 4. TRANSACTION: Trừ tiền + Tạo bài + Ghi lịch sử (Quan trọng)
        const result = await prisma.$transaction(async (tx) => {
            
            // A. Trừ tiền User (Lấy lại user mới đã trừ tiền)
            const updatedUser = await tx.users.update({
                where: { user_id: BigInt(userId) },
                data: { account_balance: { decrement: postFee } }
            });

            // B. Tạo bài viết (Kèm Roommate Details)
            const newPost = await tx.posts.create({
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
                    expired_at: expiredDate, // Lưu ngày hết hạn
                    
                    post_latitude: latitude ? parseFloat(latitude) : null,
                    post_longitude: longitude ? parseFloat(longitude) : null,

                    // Lưu thông tin chi tiết tìm bạn
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
                    // Lưu ảnh
                    images: { create: imageData }
                }
            });

            // C. Ghi lịch sử giao dịch
            await tx.transactions.create({
                data: {
                    user_id: BigInt(userId),
                    amount: -postFee, // Số âm
                    type: 'PAYMENT',
                    status: 'SUCCESS',
                    payment_method: 'WALLET',
                    transaction_code: `RP_${newPost.post_id}_${Date.now()}`,
                    description: `Phí tìm bạn ở ghép (${durationDays} ngày): ${title.substring(0, 20)}...`
                }
            });

            return { newPost, updatedUser };
        });

        // 5. Trả về kết quả kèm Số dư mới (để Frontend cập nhật ngay)
        const responseData = { 
            ...result.newPost, 
            user_id: result.newPost.user_id.toString(),
            post_id: result.newPost.post_id
        };

        res.status(201).json({ 
            success: true, 
            message: "Đăng tin thành công!", 
            data: { postId: result.newPost.post_id },
            newBalance: result.updatedUser.account_balance.toString() // Quan trọng
        });

    } catch (error) {
        console.error("Lỗi đăng tin:", error);
        res.status(500).json({ success: false, message: "Lỗi server: " + error.message });
    }
});

// --- 2. LẤY DANH SÁCH PUBLIC (QUAN TRỌNG: ĐÃ SỬA ĐỂ HIỆN TÊN + ẢNH) ---
router.get('/public', async (req, res) => {
    try {
        const { 
            keyword, city, district, 
            priceMin, priceMax, 
            gender, career, ageMin, ageMax, 
            habits 
        } = req.query;

        const whereClause = {
            category: 'O_GHEP',
            status: 'AVAILABLE',
        };

        if (keyword) {
            whereClause.OR = [
                { post_title: { contains: keyword } },
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

        const detailsWhere = {};
        let hasDetailFilter = false;

        if (gender && gender !== 'ALL') { detailsWhere.gender_partner = gender; hasDetailFilter = true; }
        if (career) { detailsWhere.career = career; hasDetailFilter = true; }
        if (ageMin) { detailsWhere.age_range_min = { lte: parseInt(ageMin) }; hasDetailFilter = true; }
        if (ageMax) { detailsWhere.age_range_max = { gte: parseInt(ageMax) }; hasDetailFilter = true; }
        if (habits) {
            const habitList = habits.split(',');
            detailsWhere.AND = habitList.map(h => ({ habits: { contains: h } }));
            hasDetailFilter = true;
        }

        if (hasDetailFilter) { whereClause.roommate_details = { is: detailsWhere }; }

        // --- ĐÂY LÀ ĐOẠN ĐÃ ĐƯỢC SỬA ---
        const posts = await prisma.posts.findMany({
            where: whereClause,
            include: {
                roommate_details: true,
                images: true,
                // THÊM ĐOẠN NÀY ĐỂ LẤY THÔNG TIN USER
                user: {
                    select: {
                        user_id: true,
                        user_first_name: true,
                        user_last_name: true,
                        user_avatar: true
                    }
                }
            },
            orderBy: { created_at: 'desc' }
        });
        
        const safePosts = posts.map(p => ({
            ...p, 
            user_id: p.user_id.toString(),
            // Đảm bảo user_id trong object user cũng là string (nếu cần dùng)
            user: p.user ? { ...p.user, user_id: p.user.user_id.toString() } : null
        }));
        
        res.status(200).json({ success: true, data: safePosts });
    } catch (error) {
        console.error("Lỗi filter:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
});

// --- 3. LẤY DANH SÁCH BÀI CỦA TÔI ---
router.get('/my-posts', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const posts = await prisma.posts.findMany({
            where: {
                user_id: BigInt(userId),
                category: 'O_GHEP' 
            },
            include: {
                roommate_details: true, 
                images: true,
                // CŨNG THÊM USER VÀO ĐÂY LUÔN CHO ĐỒNG BỘ
                user: {
                    select: {
                        user_id: true,
                        user_first_name: true,
                        user_last_name: true,
                        user_avatar: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc' 
            }
        });

        const safePosts = posts.map(post => ({
            ...post,
            user_id: post.user_id.toString(),
            user: post.user ? { ...post.user, user_id: post.user.user_id.toString() } : null
        }));

        res.status(200).json({ success: true, data: safePosts });

    } catch (error) {
        console.error("Lỗi lấy danh sách:", error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
});

// --- 4. XÓA BÀI ĐĂNG ---
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = parseInt(req.params.id);

        const post = await prisma.posts.findUnique({ where: { post_id: postId } });

        if (!post) return res.status(404).json({ message: "Bài viết không tồn tại" });
        if (post.user_id.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Bạn không có quyền xóa bài này" });
        }

        await prisma.posts.delete({ where: { post_id: postId } });
        res.status(200).json({ success: true, message: "Đã xóa bài viết" });

    } catch (error) {
        console.error("Lỗi xóa bài:", error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
});

// --- 5. CẬP NHẬT TRẠNG THÁI ---
router.put('/:id/status', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = parseInt(req.params.id);
        const { status } = req.body; 

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