# 🚀 Getting Started with DineNow

## ✅ Pre-Launch Checklist

### Step 1: Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### Step 2: Configure Environment Variables

#### Backend Configuration
```bash
cd backend
cp .env.example .env
```

**Edit `backend/.env`** and set:
- [ ] `JWT_SECRET` - Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- [ ] `JWT_REFRESH_SECRET` - Generate another one
- [ ] `MONGO_URI` - Your MongoDB connection string
- [ ] `GOOGLE_CLIENT_ID` - From Google Cloud Console (optional)
- [ ] `GOOGLE_CLIENT_SECRET` - From Google Cloud Console (optional)

#### Frontend Configuration
```bash
cd frontend
cp .env.example .env
```

**Edit `frontend/.env`** and set:
- [ ] `VITE_GOOGLE_CLIENT_ID` - Same as backend (optional)

### Step 3: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB locally
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to `backend/.env` as `MONGO_URI`

### Step 4: Setup Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project "DineNow"
3. Enable "Google+ API"
4. Create OAuth 2.0 credentials
5. Add authorized origins:
   - `http://localhost:5173`
6. Copy Client ID to both `.env` files

### Step 5: Generate JWT Secrets

**Windows (PowerShell):**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Linux/Mac:**
```bash
openssl rand -hex 32
```

Run twice and use for `JWT_SECRET` and `JWT_REFRESH_SECRET`

### Step 6: Start DineNow

**Option A: Quick Start (Windows)**
```bash
start-dinenow.bat
```

**Option B: Manual Start**
```bash
# Terminal 1 - Backend
cd backend
npm run server

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### Step 7: Verify Installation

- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] No errors in console
- [ ] MongoDB connected (check backend logs)

### Step 8: Test Authentication

1. Open http://localhost:5173
2. Click "Register" or "Sign Up"
3. Create test account:
   - Name: Test User
   - Email: test@dinenow.com
   - Password: password123
4. Login with credentials
5. Verify you're redirected to home page

---

## 🎯 First Time Setup (5 Minutes)

### Quick Configuration Script

**Windows (PowerShell):**
```powershell
# Generate JWT secrets
$jwt_secret = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
$jwt_refresh = node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Create backend .env
cd backend
Copy-Item .env.example .env
(Get-Content .env) -replace 'your_jwt_secret_here_min_32_chars', $jwt_secret | Set-Content .env
(Get-Content .env) -replace 'your_jwt_refresh_secret_here_min_32_chars', $jwt_refresh | Set-Content .env

# Create frontend .env
cd ../frontend
Copy-Item .env.example .env

echo "✅ Configuration complete! Edit .env files with your MongoDB URI"
```

---

## 🔧 Common Issues & Solutions

### Issue: Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### Issue: MongoDB Connection Failed

**Error:** `MongooseServerSelectionError`

**Solutions:**
1. Check MongoDB is running: `mongod`
2. Verify `MONGO_URI` in `backend/.env`
3. For Atlas: Check IP whitelist (allow 0.0.0.0/0 for testing)
4. Check network connection

### Issue: CORS Error

**Error:** `Access to XMLHttpRequest blocked by CORS`

**Solutions:**
1. Verify frontend is on port 5173
2. Check `FRONTEND_URL` in `backend/.env`
3. Restart both servers
4. Clear browser cache

### Issue: Google OAuth Not Working

**Error:** `Invalid Google token`

**Solutions:**
1. Verify `GOOGLE_CLIENT_ID` matches in both .env files
2. Check authorized origins in Google Console
3. Ensure `http://localhost:5173` is added (not https)
4. Try clearing browser cookies

### Issue: Cookies Not Set

**Error:** `Access denied. No token provided`

**Solutions:**
1. Check `axios.defaults.withCredentials = true` in frontend
2. Verify CORS credentials: true in backend
3. Use same domain (localhost) for both
4. Check browser cookie settings

---

## 📊 Verify Everything Works

### Backend Health Check
```bash
curl http://localhost:5000/
# Should return: "API Working 🚀"
```

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123"}'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}' \
  -c cookies.txt
```

### Test Protected Route
```bash
curl http://localhost:5000/api/auth/profile -b cookies.txt
```

---

## 🎓 Next Steps

### 1. Create Your First Admin User
```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

### 2. Explore the System
- [ ] Browse menu items
- [ ] Add items to cart
- [ ] Place an order
- [ ] Check table selection
- [ ] Try AI chat feature

### 3. Customize DineNow
- [ ] Add your restaurant logo
- [ ] Update color scheme
- [ ] Add menu items
- [ ] Configure payment gateway
- [ ] Set up email notifications

### 4. Build Role-Specific Pages
- [ ] Admin dashboard (`/admin`)
- [ ] Kitchen interface (`/kitchen`)
- [ ] Staff order management
- [ ] Analytics & reports

---

## 📚 Learn More

- **Authentication**: Read [AUTH_REFERENCE.md](AUTH_REFERENCE.md)
- **Setup Details**: Read [SETUP.md](SETUP.md)
- **Recent Changes**: Read [FIXES_APPLIED.md](FIXES_APPLIED.md)

---

## 🆘 Still Having Issues?

1. Check console logs (backend terminal)
2. Check browser console (F12)
3. Verify all environment variables are set
4. Ensure MongoDB is running
5. Check ports 5000 & 5173 are available
6. Try restarting both servers
7. Clear browser cache and cookies

---

## ✨ You're Ready!

Once everything is working:
1. Start building your restaurant features
2. Customize the UI
3. Add your menu items
4. Test with real scenarios
5. Deploy to production

**Happy coding! 🍽️**
