import express from 'express';
import {
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    updateProfile,
    changePassword,
    googleLogin,
    refreshAccessToken
} from '../controllers/authController.js';
import { authMiddleware, adminMiddleware, staffMiddleware, verifyRole } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

// Public routes
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/google', googleLogin);
authRouter.post('/refresh', refreshAccessToken);

// Protected routes (require authentication)
authRouter.post('/logout', authMiddleware, logoutUser);
authRouter.get('/profile', authMiddleware, getProfile);
authRouter.put('/update', authMiddleware, updateProfile);
authRouter.put('/change-password', authMiddleware, changePassword);

// Role-based routes examples
// authRouter.get('/admin/dashboard', authMiddleware, verifyRole(['admin']), getAdminDashboard);
// authRouter.get('/kitchen/orders', authMiddleware, verifyRole(['staff', 'admin']), getKitchenOrders);

export default authRouter;
