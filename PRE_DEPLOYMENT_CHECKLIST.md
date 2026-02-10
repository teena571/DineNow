# ✅ Pre-Deployment Checklist - DineNow

Complete this checklist before deploying to production.

## 🔐 Security

- [x] `.env` files are in `.gitignore`
- [x] JWT secrets are strong (32+ characters)
- [x] CORS is configured properly
- [x] Rate limiting is enabled
- [x] Helmet security headers enabled
- [x] Password hashing with bcrypt
- [x] HttpOnly cookies for tokens
- [ ] Google OAuth credentials (if using)
- [x] MongoDB Atlas IP whitelist configured

## 📦 Backend (Node.js + Express)

- [x] `package.json` has all dependencies
- [x] `npm start` script exists
- [x] Port configured via environment variable
- [x] Database connection uses `MONGO_URI` env var
- [x] CORS allows frontend URL
- [x] Static files served from `/uploads`
- [x] All routes tested locally
- [x] Error handling implemented
- [x] Logging configured

## 🎨 Frontend (React + Vite)

- [x] `package.json` has all dependencies
- [x] `npm run build` works locally
- [x] API URL uses environment variable
- [x] All API calls use `VITE_API_URL`
- [x] Images load correctly
- [x] Routing works (React Router)
- [x] Authentication flow tested
- [x] Category filtering works
- [x] Cart functionality works

## 🗄️ Database (MongoDB Atlas)

- [x] Database created: `DineNow`
- [x] Collections exist: `foods`, `users`, `orders`, `carts`, `tables`
- [x] Food data seeded (32 items)
- [x] Network Access: Allow `0.0.0.0/0` (for Render)
- [x] Database user created with read/write permissions
- [x] Connection string tested

## 📁 Files to Check

### Backend Files
- [x] `backend/package.json` - Dependencies correct
- [x] `backend/server.js` - Production ready
- [x] `backend/.env.example` - Template exists
- [x] `backend/config/db.js` - MongoDB connection
- [x] `backend/routes/*` - All routes defined
- [x] `backend/controllers/*` - All controllers exist
- [x] `backend/models/*` - All models defined
- [x] `backend/middleware/authMiddleware.js` - Auth working

### Frontend Files
- [x] `frontend/package.json` - Dependencies correct
- [x] `frontend/vite.config.js` - Build config correct
- [x] `frontend/.env.example` - Template exists
- [x] `frontend/src/context/StoreContext.jsx` - API URL from env
- [x] `frontend/src/context/AuthContext.jsx` - Auth working
- [x] `frontend/src/App.jsx` - Routes configured
- [x] `frontend/src/components/*` - All components exist

### Root Files
- [x] `.gitignore` - Excludes sensitive files
- [x] `README.md` - Project documentation
- [x] `DEPLOYMENT_GUIDE.md` - Deployment instructions
- [x] `vercel.json` - Vercel configuration
- [x] `render.yaml` - Render configuration

## 🧪 Testing

### Local Testing
- [x] Backend runs: `cd backend && npm start`
- [x] Frontend runs: `cd frontend && npm run dev`
- [x] API calls work between frontend and backend
- [x] Database operations work (CRUD)
- [x] Authentication works (login/register)
- [x] Category filtering works
- [x] Cart operations work
- [x] Order placement works

### API Endpoints to Test
- [x] `GET /api/food/list` - Returns food items
- [x] `POST /api/auth/register` - Creates user
- [x] `POST /api/auth/login` - Returns token
- [x] `GET /api/auth/profile` - Returns user data
- [x] `POST /api/cart/add` - Adds to cart
- [x] `POST /api/order/place` - Creates order

## 🌐 Environment Variables

### Backend (.env)
```
✅ PORT=5000
✅ NODE_ENV=production
✅ MONGO_URI=mongodb+srv://...
✅ JWT_SECRET=...
✅ JWT_REFRESH_SECRET=...
✅ GEMINI_API_KEY=...
⚠️ GOOGLE_CLIENT_ID=... (optional)
⚠️ GOOGLE_CLIENT_SECRET=... (optional)
✅ FRONTEND_URL=https://...
```

### Frontend (.env)
```
✅ VITE_API_URL=https://...
✅ VITE_FRONTEND_URL=https://...
⚠️ VITE_GOOGLE_CLIENT_ID=... (optional)
```

## 📊 MongoDB Atlas Setup

- [x] Cluster created
- [x] Database user created
- [x] Network Access: `0.0.0.0/0` allowed
- [x] Connection string copied
- [x] Database name: `DineNow`
- [x] Collections created automatically

## 🚀 Deployment Platforms

### Render (Backend)
- [ ] Account created
- [ ] Repository connected
- [ ] Web service created
- [ ] Environment variables added
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Root directory: `backend`

### Vercel (Frontend)
- [ ] Account created
- [ ] Repository connected
- [ ] Project imported
- [ ] Environment variables added
- [ ] Framework: Vite
- [ ] Root directory: `frontend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`

## 🔄 Post-Deployment

- [ ] Backend URL copied
- [ ] Frontend URL copied
- [ ] Update `FRONTEND_URL` in Render
- [ ] Update `VITE_API_URL` in Vercel
- [ ] Test live backend: `/api/food/list`
- [ ] Test live frontend: Open in browser
- [ ] Test API connection
- [ ] Test authentication
- [ ] Test all features

## 📱 Final Checks

- [ ] App loads without errors
- [ ] Food items display correctly
- [ ] Category filtering works
- [ ] Images load properly
- [ ] Cart functionality works
- [ ] Authentication works
- [ ] Orders can be placed
- [ ] Mobile responsive
- [ ] No console errors
- [ ] HTTPS enabled (automatic)

## 🎉 Ready to Deploy!

If all items are checked, you're ready to deploy! 🚀

Follow the steps in `DEPLOYMENT_GUIDE.md` or `QUICK_DEPLOY.md`

---

## 📝 Notes

- **First Load**: Render free tier sleeps after 15 min inactivity
- **Cold Start**: First request takes 30-60 seconds
- **Auto Deploy**: Push to GitHub triggers auto-deployment
- **Logs**: Check Render/Vercel dashboards for errors

---

## 🆘 If Something Goes Wrong

1. Check deployment logs in Render/Vercel
2. Verify environment variables
3. Test MongoDB connection
4. Check CORS settings
5. Review `DEPLOYMENT_GUIDE.md` troubleshooting section

---

**Status**: ✅ Ready for Deployment
**Last Updated**: February 2026
