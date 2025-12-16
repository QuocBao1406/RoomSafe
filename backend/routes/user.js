import express from 'express';
import * as userController from '../controllers/userController.js';
import { verifyToken } from '../lib/middleware.js';

const router = express.Router();


// GET
router.get('/profile', verifyToken, userController.getProfile);

// PUT - Thêm middleware uploadAvatar vào giữa
router.put('/profile', 
    verifyToken, 
    userController.uploadAvatar, // <-- QUAN TRỌNG: Middleware xử lý file
    userController.updateProfile
);

export default router;