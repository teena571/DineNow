# 🚀 DineNow Deployment Guide

Complete step-by-step guide to deploy your DineNow restaurant management system to production.

## 📋 Prerequisites

- GitHub account (already have ✅)
- MongoDB Atlas account (already set up ✅)
- Vercel account (free)
- Render account (free)

---

## 🎯 Deployment Architecture

```
Frontend (Vercel) → Backend (Render) → Database (MongoDB Atlas)
```

- **Frontend**: React + Vite on Vercel
- **Backend**: Node.js + Express on Render
- **Database**: MongoDB Atlas (already configured)

---

## 📦 Step 1: Prepare Your Code

### 1.1 Update Backend for Production

Your backend is already configured with:
- ✅ CORS settings
- ✅ Environment variables
- ✅ Port configuration
- ✅ MongoDB connection

### 1.2 Update Frontend for Production

Your frontend needs to use production API URL after deployment.

---

## 🔧 Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

### 2.2 Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your **DineNow** repository
3. Configure:
   - **Name**: `dinenow-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 2.3 Add Environment Variables
Click **"Environment"** and add these variables:

```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://teenarai571_db_user:TeenaRaiKattri@cluster.hynxywh.mongodb.net/DineNow
JWT_SECRET=02dec274d913a0141c8dff155f63f3ef214bdb96d983ce46536cc2f41d377566
JWT_REFRESH_SECRET=a8f5e2c9b1d4f7e3a6c8b2d5f9e1c4a7b3d6f8e2c5a9b1d4f7e3a6c8b2d5f9e1
GEMINI_API_KEY=AIzaSyATvAkMPZSA15x7WJEY1kHG8SPy63N_m2Y
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
FRONTEND_URL=https://your-app-name.vercel.app
```

**Note**: Replace `FRONTEND_URL` after deploying frontend (Step 3)

### 2.4 Deploy
1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. Your backend URL will be: `https://dinenow-backend.onrender.com`

### 2.5 Test Backend
Open: `https://dinenow-backend.onrender.com/api/food/list`

Should return JSON with food items.

---

## 🌐 Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel

### 3.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Import **DineNow** repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.3 Add Environment Variables
Click **"Environment Variables"** and add:

```
VITE_API_URL=https://dinenow-backend.onrender.com/api
VITE_FRONTEND_URL=https://your-app-name.vercel.app
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

**Note**: Replace `dinenow-backend` with your actual Render backend URL

### 3.4 Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your frontend URL will be: `https://your-app-name.vercel.app`

---

## 🔄 Step 4: Update CORS and Environment Variables

### 4.1 Update Backend FRONTEND_URL
1. Go to Render dashboard
2. Open your backend service
3. Go to **Environment** tab
4. Update `FRONTEND_URL` to your Vercel URL
5. Click **"Save Changes"**
6. Service will auto-redeploy

### 4.2 Verify CORS in server.js
Your `backend/server.js` already has:
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
};
app.use(cors(corsOptions));
```
✅ This is correct!

---

## 🗄️ Step 5: Seed Production Database (Optional)

If you want to seed food data to production:

1. Update `backend/.env` temporarily with production MongoDB URI
2. Run: `npm run seed`
3. Revert `.env` to local settings

**OR** use MongoDB Atlas UI to import data directly.

---

## ✅ Step 6: Test Your Deployment

### 6.1 Test Backend
```bash
curl https://dinenow-backend.onrender.com/api/food/list
```

### 6.2 Test Frontend
1. Open: `https://your-app-name.vercel.app`
2. Check if food items load
3. Test category filtering
4. Test authentication (if configured)

### 6.3 Common Issues

**Issue**: Frontend can't connect to backend
- **Fix**: Check CORS settings and FRONTEND_URL in Render

**Issue**: Backend shows "Cannot connect to database"
- **Fix**: Verify MONGO_URI in Render environment variables

**Issue**: Images not loading
- **Fix**: Check if images are in `backend/uploads` folder

---

## 🔐 Step 7: Security Checklist

- ✅ Never commit `.env` files
- ✅ Use environment variables for secrets
- ✅ Enable HTTPS (automatic on Vercel/Render)
- ✅ Set strong JWT secrets
- ✅ Configure MongoDB Atlas IP whitelist (allow all: 0.0.0.0/0 for Render)
- ✅ Enable rate limiting (already configured)
- ✅ Use helmet for security headers (already configured)

---

## 📱 Step 8: Custom Domain (Optional)

### For Vercel (Frontend)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### For Render (Backend)
1. Go to Settings → Custom Domain
2. Add your API subdomain (e.g., api.yourdomain.com)
3. Update DNS records

---

## 🔄 Step 9: Continuous Deployment

Both Vercel and Render auto-deploy when you push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

- Vercel: Auto-deploys frontend
- Render: Auto-deploys backend

---

## 📊 Step 10: Monitor Your App

### Vercel Dashboard
- View deployment logs
- Check build status
- Monitor analytics

### Render Dashboard
- View server logs
- Check health status
- Monitor resource usage

---

## 🆘 Troubleshooting

### Backend Issues

**Render service won't start:**
```bash
# Check logs in Render dashboard
# Common fixes:
- Verify all environment variables are set
- Check MongoDB connection string
- Ensure PORT is set to 5000
```

**Database connection fails:**
```bash
# MongoDB Atlas fixes:
1. Go to MongoDB Atlas → Network Access
2. Add IP: 0.0.0.0/0 (allow all)
3. Or add Render's IP addresses
```

### Frontend Issues

**Build fails on Vercel:**
```bash
# Common fixes:
- Check if all dependencies are in package.json
- Verify build command: npm run build
- Check output directory: dist
```

**API calls fail:**
```bash
# Check:
1. VITE_API_URL is correct
2. Backend is running
3. CORS is configured properly
```

---

## 🎉 Success Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Environment variables configured
- [ ] CORS working
- [ ] Database connected
- [ ] Food items loading
- [ ] Category filtering works
- [ ] Authentication works (if enabled)
- [ ] Images loading properly

---

## 📝 Your Deployment URLs

After deployment, update these:

```
Frontend: https://your-app-name.vercel.app
Backend:  https://dinenow-backend.onrender.com
Database: mongodb+srv://cluster.hynxywh.mongodb.net/DineNow
```

---

## 🚀 Quick Deploy Commands

```bash
# 1. Commit latest changes
git add .
git commit -m "Prepare for deployment"
git push origin main

# 2. Deploy backend (Render auto-deploys from GitHub)
# 3. Deploy frontend (Vercel auto-deploys from GitHub)
```

---

## 📞 Support

If you face issues:
1. Check Render logs: Dashboard → Logs
2. Check Vercel logs: Deployments → View Function Logs
3. Check MongoDB Atlas: Metrics → Performance

---

## 🎯 Next Steps After Deployment

1. **Test thoroughly** - Check all features
2. **Monitor performance** - Use Render/Vercel dashboards
3. **Set up analytics** - Add Google Analytics
4. **Configure backups** - MongoDB Atlas automated backups
5. **Add monitoring** - Use UptimeRobot for uptime monitoring

---

## 💡 Pro Tips

1. **Free Tier Limits**:
   - Render: 750 hours/month, sleeps after 15 min inactivity
   - Vercel: Unlimited bandwidth, 100 GB-hours
   - MongoDB Atlas: 512 MB storage

2. **Keep Backend Awake**:
   - Use cron-job.org to ping your backend every 10 minutes
   - Prevents Render free tier from sleeping

3. **Optimize Images**:
   - Compress images before uploading
   - Use WebP format for better performance

4. **Enable Caching**:
   - Add cache headers for static assets
   - Use CDN for images

---

## ✅ Deployment Complete!

Your DineNow app is now live and accessible worldwide! 🎉

**Share your app**: Send the Vercel URL to anyone to access your restaurant management system.

---

**Last Updated**: February 2026
**Version**: 1.0.0
