# 🍽️ DineNow - Restaurant Food Order Management System

A production-ready MERN stack restaurant order management system for in-restaurant dining.

## 🚀 Quick Start

### Windows
```bash
# Double-click or run:
start-dinenow.bat
```

### Manual Start
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run server

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

## 📋 Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- Google OAuth credentials (optional)

## ⚙️ Configuration

### 1. Backend Setup
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
JWT_SECRET=your_strong_secret_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_min_32_chars
MONGO_URI=mongodb://localhost:27017/dinenow
GOOGLE_CLIENT_ID=your_google_client_id
FRONTEND_URL=http://localhost:5173
```

### 2. Frontend Setup
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **API**: http://localhost:5173/api (proxied)

## 🔐 Authentication Features

- ✅ Email/Password registration & login
- ✅ Google OAuth (One-tap login)
- ✅ JWT with auto-refresh (Access: 15min, Refresh: 7 days)
- ✅ Role-based access (customer/staff/admin)
- ✅ HttpOnly secure cookies
- ✅ Rate limiting & security headers

## 👥 User Roles

| Role | Access | Default Route |
|------|--------|---------------|
| **customer** | Order food, manage cart, view menu | `/` |
| **staff** | Kitchen operations, order management | `/kitchen` |
| **admin** | Full system access | `/admin` |

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup guide
- **[AUTH_REFERENCE.md](AUTH_REFERENCE.md)** - Authentication API reference
- **[FIXES_APPLIED.md](FIXES_APPLIED.md)** - Recent improvements

## 🛠️ Tech Stack

### Frontend
- React 19 + Vite
- React Router DOM
- Tailwind CSS
- Axios
- Google OAuth
- React Toastify

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt
- Helmet.js
- Rate Limiting
- Google OAuth

## 📦 Project Structure

```
DineNow/
├── backend/
│   ├── config/          # Database config
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & validation
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Auth & Store context
│   │   ├── pages/       # Page components
│   │   └── App.jsx      # Main app
│   └── vite.config.js   # Vite config
└── admin/               # Admin panel (separate)
```

## 🔒 Security Features

- Helmet.js for HTTP headers
- Rate limiting (100 req/15min, 5 auth/15min)
- CORS restricted to frontend URL
- HttpOnly cookies (XSS protection)
- SameSite: strict (CSRF protection)
- bcrypt password hashing
- JWT token rotation

## 🧪 Testing

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@dinenow.com","password":"password123"}'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@dinenow.com","password":"password123"}' \
  -c cookies.txt
```

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT secrets (32+ chars)
- [ ] Enable HTTPS
- [ ] Update CORS origins
- [ ] Configure MongoDB authentication
- [ ] Set up monitoring
- [ ] Enable logging
- [ ] Configure backup strategy

## 📝 API Endpoints

### Public
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/refresh` - Refresh token

### Protected
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - Logout
- `PUT /api/auth/update` - Update profile
- `PUT /api/auth/change-password` - Change password

### Food & Orders
- `GET /api/food` - Get menu items
- `POST /api/order` - Place order (customer/admin)
- `GET /api/order` - Get orders
- `GET /api/tables` - Get table status

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues or questions:
- Check [SETUP.md](SETUP.md) for setup help
- Review [AUTH_REFERENCE.md](AUTH_REFERENCE.md) for API docs
- Check backend/frontend console logs
- Verify MongoDB connection
- Ensure ports 5000 & 5173 are available

## 🎯 Roadmap

- [x] Authentication system
- [x] Role-based access
- [x] Google OAuth
- [ ] Admin dashboard
- [ ] Kitchen/staff interface
- [ ] Real-time order updates (Socket.io)
- [ ] Payment integration
- [ ] Email notifications
- [ ] Order history & analytics
- [ ] Table reservation system
- [ ] QR code menu

---

**Built with ❤️ for restaurant management**
