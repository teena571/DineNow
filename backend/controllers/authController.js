import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { OAuth2Client } from 'google-auth-library';

// Helper function to create access token (15 min)
const createAccessToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

// Helper function to create refresh token (7 days)
const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// Helper function to set tokens as httpOnly cookies
const setTokenCookies = (res, accessToken, refreshToken) => {
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 minutes
    });
    
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
};

// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validate inputs
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please enter a valid email.' });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long.' });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User with this email already exists.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        // Generate tokens and set cookies
        const accessToken = createAccessToken(user._id, user.role);
        const refreshToken = createRefreshToken(user._id);
        
        // Save refresh token to database
        user.refreshToken = refreshToken;
        await user.save();
        
        setTokenCookies(res, accessToken, refreshToken);

        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully.',
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required.' });
        }

        // Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials.' });
        }

        // Generate tokens and set cookies
        const accessToken = createAccessToken(user._id, user.role);
        const refreshToken = createRefreshToken(user._id);
        
        // Save refresh token to database
        user.refreshToken = refreshToken;
        await user.save();
        
        setTokenCookies(res, accessToken, refreshToken);

        res.status(200).json({ 
            success: true, 
            message: 'Login successful.', 
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// Logout user
const logoutUser = async (req, res) => {
    try {
        // Clear refresh token from database
        if (req.user) {
            await userModel.findByIdAndUpdate(req.user._id, { refreshToken: null });
        }
        
        // Clear cookies
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json({ success: true, message: 'Logout successful.' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// Get current user profile
const getProfile = async (req, res) => {
    try {
        const user = req.user; // From authMiddleware
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    const { name, email } = req.body;

    try {
        const user = req.user; // From authMiddleware

        // Validate inputs
        if (name && name.trim().length === 0) {
            return res.status(400).json({ success: false, message: 'Name cannot be empty.' });
        }

        if (email && !validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Please enter a valid email.' });
        }

        // Check if email is already taken by another user
        if (email && email !== user.email) {
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ success: false, message: 'Email is already in use.' });
            }
        }

        // Update user
        const updatedUser = await userModel.findByIdAndUpdate(
            user._id,
            { name: name || user.name, email: email || user.email },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully.',
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                createdAt: updatedUser.createdAt
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// Change password
const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const user = req.user; // From authMiddleware

        // Validate inputs
        if (!oldPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Old password and new password are required.' });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ success: false, message: 'New password must be at least 8 characters long.' });
        }

        // Verify old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Old password is incorrect.' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });

        res.status(200).json({ success: true, message: 'Password changed successfully.' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// Google OAuth login
const googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        // Validate input
        if (!token) {
            return res.status(400).json({ success: false, message: 'Google token is required.' });
        }

        // Verify Google token
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(401).json({ success: false, message: 'Invalid Google token.' });
        }

        const { sub: googleId, name, email, picture } = payload;

        // Check if user exists
        let user = await userModel.findOne({ $or: [{ email }, { googleId }] });

        if (!user) {
            // Create new user with Google OAuth
            user = new userModel({
                name,
                email,
                googleId,
                avatar: picture,
                role: 'customer'
            });
            await user.save();
        } else if (!user.googleId) {
            // Link Google account to existing user
            user.googleId = googleId;
            user.avatar = picture;
            await user.save();
        }

        // Generate tokens and set cookies
        const accessToken = createAccessToken(user._id, user.role);
        const refreshToken = createRefreshToken(user._id);
        
        // Save refresh token to database
        user.refreshToken = refreshToken;
        await user.save();
        
        setTokenCookies(res, accessToken, refreshToken);

        res.status(200).json({ 
            success: true, 
            message: 'Google login successful.', 
            user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar }
        });
    } catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};

// Refresh access token
const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        
        if (!refreshToken) {
            return res.status(401).json({ success: false, message: 'Refresh token not found.' });
        }

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        
        // Find user and verify refresh token matches
        const user = await userModel.findById(decoded.id);
        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ success: false, message: 'Invalid refresh token.' });
        }

        // Generate new access token
        const newAccessToken = createAccessToken(user._id, user.role);
        
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        res.status(200).json({ 
            success: true, 
            message: 'Token refreshed successfully.',
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(401).json({ success: false, message: 'Invalid or expired refresh token.' });
    }
};

export { registerUser, loginUser, logoutUser, getProfile, updateProfile, changePassword, googleLogin, refreshAccessToken };
