import express from 'express';
import prisma from "../lib/db.js";
import { verifyToken } from '../lib/middleware.js';
import upload from '../lib/upload.js'; 

const router = express.Router();

router.post('/create', verifyToken, upload.array('images', 5), async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            // --- POSTS ---
            title, description, price, area, address, 
            city, district, ward, // Đã có Ward
            priceElectricity, priceWater, priceInternet,
            duration, // <-- Nhận thêm duration (số ngày)
            
            // --- ROOMMATE DETAILS ---
            genderPartner, ageRange, career, habits, 
            hobbies, sharedCost,
            
            category = 'O_GHEP' 
        } = req.body;

        // 1. Xử lý khoảng tuổi
        let ageMin = null, ageMax = null;
        if (ageRange) {
            const parts = ageRange.split('-').map(p => parseInt(p.trim()));
            if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                ageMin = parts[0]; ageMax = parts[1];
            } else if (parts.length === 1 && !isNaN(parts[0])) ageMin = parts[0];
        }

        // 2. Helper parse số an toàn
        const parseIntSafe = (val) => (!val || val === '' || isNaN(val)) ? null : parseInt(val);

        // 3. Tính ngày hết hạn (expired_at)
        let expiredAt = null;
        if (duration) {
            const days = parseInt(duration);
            if (!isNaN(days)) {
                const date = new Date();
                date.setDate(date.getDate() + days);
                expiredAt = date; // Trả về đối tượng Date
            }
        }

        // 4. Map ảnh
        let imageData = [];
        if (req.files && req.files.length > 0) {
            imageData = req.files.map(file => ({ url: file.path }));
        }

        // 5. Lưu DB
        const newPost = await prisma.posts.create({
            data: {
                // --- POSTS Fields ---
                post_title: title,
                post_description: description,
                post_price: parseIntSafe(price) || 0,
                post_area: parseFloat(area) || 0,
                post_address: address,
                post_city: city,
                post_district: district,
                post_ward: ward || '', // Lưu Phường/Xã
                
                // Dịch vụ
                price_electricity: parseIntSafe(priceElectricity),
                price_water: parseIntSafe(priceWater),
                price_internet: parseIntSafe(priceInternet),

                // Meta
                category: category,
                status: 'AVAILABLE',
                user_id: BigInt(userId),
                expired_at: expiredAt, // <-- Lưu ngày hết hạn

                // --- Relation 1-1: RoommateDetails ---
                roommate_details: {
                    create: {
                        gender_partner: genderPartner || 'ALL',
                        age_range_min: ageMin,
                        age_range_max: ageMax,
                        career: career,
                        habits: habits,
                        hobbies: hobbies,
                        shared_cost: sharedCost 
                    }
                },

                // --- Relation 1-N: Images ---
                images: { create: imageData }
            }
        });

        res.status(201).json({ success: true, message: "Đăng tin thành công!", data: { postId: newPost.post_id } });

    } catch (error) {
        console.error("Lỗi đăng tin:", error);
        res.status(500).json({ success: false, message: "Lỗi server" });
    }
});

export default router;