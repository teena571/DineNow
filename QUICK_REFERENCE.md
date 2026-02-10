# 🚀 DineNow - Quick Reference Card

## 📍 URLs
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **API:** http://localhost:5173/api

## 🔑 Default Credentials
Create your first user at: http://localhost:5173/register

## 🎭 User Roles
| Role | Access | Route |
|------|--------|-------|
| customer | Orders, cart, menu | `/` |
| staff | Kitchen, orders | `/kitchen` |
| admin | Full access | `/admin` |

## 🛠️ Commands

### Start Servers
```bash
# Quick start (Windows)
start-dinenow.bat

# Manual
cd backend && npm run server
cd frontend && npm run dev
```

### Stop Servers
```bash
# Press Ctrl+C in each terminal
```

### Restart
```bash
# In backend terminal: rs
# In frontend terminal: Ctrl+C then npm run dev
```

## 🔐 Auth Endpoints

### Register
```bash
POST /api/auth/register
Body: { "name": "...", "email": "...", "password": "..." }
```

### Login
```bash
POST /api/auth/login
Body: { "email": "...", "password": "..." }
```

### Logout
```bash
POST /api/auth/logout
```

### Get Profile
```bash
GET /api/auth/profile
```

## 🎨 Frontend Usage

### Check Auth
```javascript
const { user, isAuthenticated } = useAuth();
if (isAuthenticated) {
  console.log(user.name, user.role);
}
```

### Login
```javascript
const result = await login(email, password);
if (result.success) navigate('/');
```

### Logout
```javascript
await logout();
navigate('/login');
```

## 🔒 Protected Routes

### Customer Only
```javascript
<ProtectedRoute allowedRoles={['customer', 'admin']}>
  <Cart />
</ProtectedRoute>
```

### Staff Only
```javascript
<ProtectedRoute allowedRoles={['staff', 'admin']}>
  <Kitchen />
</ProtectedRoute>
```

### Admin Only
```javascript
<ProtectedRoute allowedRoles={['admin']}>
  <AdminPanel />
</ProtectedRoute>
```

## 🛡️ Backend Middleware

### Require Auth
```javascript
router.get('/profile', authMiddleware, handler);
```

### Require Role
```javascript
router.get('/admin', authMiddleware, verifyRole(['admin']), handler);
router.get('/kitchen', authMiddleware, verifyRole(['staff', 'admin']), handler);
```

## 🐛 Troubleshooting

### Port in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Clear Cookies
```
Browser → F12 → Application → Cookies → Delete All
```

### MongoDB Not Connected
```
Check MONGO_URI in backend/.env
Verify MongoDB Atlas IP whitelist
```

### CORS Error
```
Verify frontend on port 5173
Check FRONTEND_URL in backend/.env
Restart both servers
```

## 📊 Database

### Change User Role
```javascript
// MongoDB shell or Compass
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)
```

### View All Users
```javascript
db.users.find({}, { password: 0, refreshToken: 0 })
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
MONGO_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=optional
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=optional
```

## 📚 Documentation Files

- **README.md** - Project overview
- **SETUP.md** - Detailed setup guide
- **GETTING_STARTED.md** - First-time setup
- **AUTH_REFERENCE.md** - Auth API docs
- **FIXES_APPLIED.md** - Recent changes
- **STATUS.md** - Current system status
- **QUICK_REFERENCE.md** - This file

## 🎯 Common Tasks

### Add Menu Item
```
Admin panel → Add Food Item
Or POST /api/food/add
```

### View Orders
```
GET /api/order/list
```

### Check Tables
```
GET /api/tables
```

### Update Profile
```
PUT /api/auth/update
Body: { "name": "...", "email": "..." }
```

### Change Password
```
PUT /api/auth/change-password
Body: { "oldPassword": "...", "newPassword": "..." }
```

## ⚡ Keyboard Shortcuts

### Backend Terminal
- `rs` - Restart server (nodemon)
- `Ctrl+C` - Stop server

### Frontend Terminal
- `Ctrl+C` - Stop dev server
- `o` - Open in browser
- `r` - Restart server
- `u` - Show server URL
- `q` - Quit

### Browser
- `F12` - Open DevTools
- `Ctrl+Shift+R` - Hard refresh
- `Ctrl+Shift+Delete` - Clear cache

## 🔍 Debugging

### Check Backend Logs
```
Look at backend terminal output
```

### Check Frontend Logs
```
Browser → F12 → Console
```

### Check Network Requests
```
Browser → F12 → Network → Filter: XHR
```

### Check Cookies
```
Browser → F12 → Application → Cookies
Should see: accessToken, refreshToken
```

## 📞 Quick Help

**Issue:** Can't login  
**Fix:** Check email/password, verify backend running, check console

**Issue:** Token expired  
**Fix:** Auto-refresh should handle it, try logout/login

**Issue:** Role access denied  
**Fix:** Check user role in database, verify route permissions

**Issue:** Google OAuth not working  
**Fix:** Configure GOOGLE_CLIENT_ID in both .env files

---

**Keep this file handy for quick reference! 📌**
