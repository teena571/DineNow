import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Middleware to verify JWT access token from httpOnly cookie
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password -refreshToken');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid token.' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired. Please refresh.', expired: true });
        }
        console.error('Auth middleware error:', error);
        res.status(401).json({ success: false, message: 'Invalid token.' });
    }
};

// Middleware to verify role
const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Authentication required.' });
        }
        
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Access denied. Insufficient permissions.' });
        }
        
        next();
    };
};

// Middleware to check if user is admin
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied. Admin role required.' });
    }
    next();
};

// Middleware to check if user is staff or admin
const staffMiddleware = (req, res, next) => {
    if (!['staff', 'admin'].includes(req.user.role)) {
        return res.status(403).json({ success: false, message: 'Access denied. Staff role required.' });
    }
    next();
};

export { authMiddleware, adminMiddleware, staffMiddleware, verifyRole };
