# DineNow - Setup Guide

## Production-Ready MERN Restaurant Order Management System

### Fixed Ports Configuration
- **Frontend**: http://localhost:5173 (strictPort: true)
- **Backend**: http://localhost:5000

---

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env` and configure:

```env
PORT=5000
NODE_ENV=development

# JWT Secrets (Generate strong secrets)
JWT_SECRET=your_strong_jwt_secret_min_32_characters
JWT_REFRESH_SECRET=your_strong_refresh_secret_min_32_characters

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# MongoDB
MONGO_URI=mongodb://localhost:27017/dinenow
# Or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/dinenow

# Payment (Optional)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# AI (Optional)
GEMINI_API_KEY=your_gemini_api_key

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 3. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized JavaScript origins:
   - `http://localhost:5173`
6. Add authorized redirect URIs:
   - `http://localhost:5173`
7. Copy Client ID and Client Secret to `.env`

### 4. Start Backend
```bash
npm run server
```

Backend will run on: http://localhost:5000

---

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_FRONTEND_URL=http://localhost:5173
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

**Important**: Use the same Google Client ID from backend setup.

### 3. Start Frontend
```bash
npm run dev
```

Frontend will run on: http://localhost:5173

---

## Authentication Features

### JWT Token System
- **Access Token**: 15 minutes (httpOnly cookie)
- **Refresh Token**: 7 days (httpOnly cookie)
- Auto-refresh before expiry
- Secure cookie settings (httpOnly, sameSite: strict)

### User Roles
1. **customer** - Default role for new users
2. **staff** - Kitchen/service staff
3. **admin** - Full system access

### OAuth Integration
- Google OAuth with one-tap login
- Automatic user creation
- Profile data sync (name, email, avatar)

### Security Features
- bcrypt password hashing (10 rounds)
- Helmet.js for HTTP headers
- Rate limiting (100 req/15min general, 5 req/15min auth)
- CORS restricted to frontend URL
- XSS/CSRF protection
- Cookie-based auth (no localStorage)

---

## API Endpoints

### Public Routes
```
POST /api/auth/register    - Register new user
POST /api/auth/login       - Login with email/password
POST /api/auth/google      - Google OAuth login
POST /api/auth/refresh     - Refresh access token
```

### Protected Routes (Require Authentication)
```
POST /api/auth/logout           - Logout user
GET  /api/auth/profile          - Get user profile
PUT  /api/auth/update           - Update profile
PUT  /api/auth/change-password  - Change password
```

### Role-Based Access
Use middleware for role protection:
```javascript
// Admin only
router.get('/admin/dashboard', authMiddleware, verifyRole(['admin']), handler);

// Staff or Admin
router.get('/kitchen/orders', authMiddleware, verifyRole(['staff', 'admin']), handler);

// Customer or Admin
router.post('/order', authMiddleware, verifyRole(['customer', 'admin']), handler);
```

---

## Frontend Usage

### Using Auth Context
```javascript
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout, register, googleLogin } = useAuth();
  
  // Check if user is logged in
  if (isAuthenticated) {
    console.log('User:', user.name, user.role);
  }
  
  // Login
  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      // Redirect based on role
      if (result.user.role === 'admin') navigate('/admin');
      else if (result.user.role === 'staff') navigate('/kitchen');
      else navigate('/');
    }
  };
}
```

### Protected Routes
```javascript
<Route path='/admin' element={
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminDashboard />
  </ProtectedRoute>
} />
```

---

## Role-Based Navigation

After login, users are redirected based on role:
- **customer** → `/` (Home page)
- **staff** → `/kitchen` (Kitchen dashboard)
- **admin** → `/admin` (Admin panel)

---

## Testing

### Test User Creation
```bash
# Register via API
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt
```

### Test Protected Route
```bash
curl http://localhost:5000/api/auth/profile \
  -b cookies.txt
```

---

## Production Deployment

### Environment Variables
Update for production:
```env
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
```

### Security Checklist
- [ ] Use strong JWT secrets (32+ characters)
- [ ] Enable HTTPS in production
- [ ] Update CORS origins
- [ ] Set secure cookie flags
- [ ] Configure rate limiting
- [ ] Enable MongoDB authentication
- [ ] Use environment-specific configs
- [ ] Add logging and monitoring

---

## Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### CORS Errors
- Verify `FRONTEND_URL` in backend `.env`
- Check frontend is running on port 5173
- Ensure `credentials: true` in axios requests

### Cookie Not Set
- Check `withCredentials: true` in axios
- Verify same domain for frontend/backend in development
- Check browser cookie settings

### Google OAuth Not Working
- Verify Client ID matches in both frontend and backend
- Check authorized origins in Google Console
- Ensure HTTPS in production

---

## Next Steps

1. Create admin dashboard pages
2. Create kitchen/staff pages
3. Implement order management
4. Add real-time updates (Socket.io)
5. Add payment integration
6. Implement table management
7. Add reporting and analytics

---

## Support

For issues or questions, check:
- Backend logs: `backend/` console
- Frontend logs: Browser DevTools console
- Network tab for API calls
- MongoDB connection status
