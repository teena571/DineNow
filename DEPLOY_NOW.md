# 🚀 Deploy DineNow NOW!

## ⚡ 3-Step Deployment (10 Minutes Total)

Your code is ready! Just follow these 3 simple steps:

---

## 📋 Before You Start

Make sure you have:
- ✅ GitHub account (you have this)
- ✅ MongoDB Atlas (already configured)
- ✅ Code pushed to GitHub (run `deploy.bat` if not)

---

## 🎯 STEP 1: Deploy Backend (5 min)

### 1.1 Go to Render
🔗 **Open**: https://render.com

### 1.2 Sign Up
- Click **"Get Started"**
- Choose **"Sign in with GitHub"**
- Authorize Render

### 1.3 Create Web Service
1. Click **"New +"** → **"Web Service"**
2. Find and select **"DineNow"** repository
3. Click **"Connect"**

### 1.4 Configure Service
Fill in these settings:

```
Name: dinenow-backend
Region: Oregon (US West)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

### 1.5 Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Copy-paste these (one by one):

```
NODE_ENV=production
```
```
PORT=5000
```
```
MONGO_URI=mongodb+srv://teenarai571_db_user:TeenaRaiKattri@cluster.hynxywh.mongodb.net/DineNow
```
```
JWT_SECRET=02dec274d913a0141c8dff155f63f3ef214bdb96d983ce46536cc2f41d377566
```
```
JWT_REFRESH_SECRET=a8f5e2c9b1d4f7e3a6c8b2d5f9e1c4a7b3d6f8e2c5a9b1d4f7e3a6c8b2d5f9e1
```
```
GEMINI_API_KEY=AIzaSyATvAkMPZSA15x7WJEY1kHG8SPy63N_m2Y
```
```
FRONTEND_URL=http://localhost:5173
```

**Note**: We'll update `FRONTEND_URL` after deploying frontend

### 1.6 Deploy!
1. Click **"Create Web Service"**
2. Wait 3-5 minutes for deployment
3. **Copy your backend URL**: `https://dinenow-backend-xxxx.onrender.com`

### 1.7 Test Backend
Open in browser: `https://your-backend-url.onrender.com/api/food/list`

Should show JSON with food items ✅

---

## 🎯 STEP 2: Deploy Frontend (5 min)

### 2.1 Go to Vercel
🔗 **Open**: https://vercel.com

### 2.2 Sign Up
- Click **"Sign Up"**
- Choose **"Continue with GitHub"**
- Authorize Vercel

### 2.3 Import Project
1. Click **"Add New..."** → **"Project"**
2. Find **"DineNow"** repository
3. Click **"Import"**

### 2.4 Configure Project
Fill in these settings:

```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 2.5 Add Environment Variables
Click **"Environment Variables"** tab

Add these variables:

**Variable 1:**
```
Name: VITE_API_URL
Value: https://your-backend-url.onrender.com/api
```
(Replace with YOUR backend URL from Step 1.6)

**Variable 2:**
```
Name: VITE_FRONTEND_URL
Value: https://your-app-name.vercel.app
```
(You'll get this after deployment)

**Variable 3:**
```
Name: VITE_GOOGLE_CLIENT_ID
Value: your_google_client_id_here
```
(Optional - only if using Google OAuth)

### 2.6 Deploy!
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. **Copy your frontend URL**: `https://your-app-name.vercel.app`

### 2.7 Update Frontend URL
1. Go to **Settings** → **Environment Variables**
2. Edit `VITE_FRONTEND_URL`
3. Paste your actual Vercel URL
4. Click **"Save"**
5. Go to **Deployments** → Click **"Redeploy"**

---

## 🎯 STEP 3: Connect Frontend & Backend

### 3.1 Update Backend FRONTEND_URL
1. Go back to **Render Dashboard**
2. Click on your **dinenow-backend** service
3. Go to **"Environment"** tab
4. Find `FRONTEND_URL` variable
5. Click **"Edit"**
6. Replace with your Vercel URL: `https://your-app-name.vercel.app`
7. Click **"Save Changes"**
8. Service will auto-redeploy (wait 2-3 min)

### 3.2 Update MongoDB Atlas (Important!)
1. Go to **MongoDB Atlas**: https://cloud.mongodb.com
2. Click **"Network Access"** (left sidebar)
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"**
5. Enter: `0.0.0.0/0`
6. Click **"Confirm"**

This allows Render to connect to your database.

---

## ✅ DONE! Test Your App

### Test Backend
Open: `https://your-backend-url.onrender.com/api/food/list`

Should return JSON with 32 food items ✅

### Test Frontend
Open: `https://your-app-name.vercel.app`

Should show:
- ✅ Food items loading
- ✅ Category filtering working
- ✅ Images displaying
- ✅ No console errors

---

## 🎉 Your App is LIVE!

**Share your app**: `https://your-app-name.vercel.app`

Anyone can access it from anywhere in the world! 🌍

---

## 📱 Your Deployment URLs

Write these down:

```
Frontend: https://_____________________.vercel.app
Backend:  https://_____________________.onrender.com
Database: mongodb+srv://cluster.hynxywh.mongodb.net/DineNow
```

---

## 🔄 Future Updates

To update your app:

```bash
# 1. Make changes to your code
# 2. Commit and push
git add .
git commit -m "Your update message"
git push origin main

# 3. Auto-deploys! ✨
# Vercel and Render will automatically deploy your changes
```

---

## ⚠️ Important Notes

### First Load is Slow
- Render free tier "sleeps" after 15 min of inactivity
- First request takes 30-60 seconds to "wake up"
- After that, it's fast!

### Keep Backend Awake (Optional)
Use **cron-job.org** to ping your backend every 10 minutes:
1. Go to https://cron-job.org
2. Create free account
3. Add job: `https://your-backend-url.onrender.com`
4. Schedule: Every 10 minutes

---

## 🆘 Troubleshooting

### Backend won't start
- Check Render logs: Dashboard → Logs
- Verify all environment variables are set
- Check MongoDB Atlas allows `0.0.0.0/0`

### Frontend shows errors
- Check Vercel logs: Deployments → View Function Logs
- Verify `VITE_API_URL` is correct
- Check browser console for errors

### Can't connect to database
- MongoDB Atlas → Network Access → Allow `0.0.0.0/0`
- Verify `MONGO_URI` is correct in Render

### CORS errors
- Verify `FRONTEND_URL` in Render matches your Vercel URL
- Check backend logs for CORS errors

---

## 📞 Need Help?

1. Check deployment logs (Render/Vercel dashboards)
2. Review `DEPLOYMENT_GUIDE.md` for detailed troubleshooting
3. Check MongoDB Atlas connection
4. Verify all environment variables

---

## 🎯 What's Next?

After deployment:
- ✅ Test all features thoroughly
- ✅ Share your app with friends/clients
- ✅ Monitor performance in dashboards
- ✅ Set up custom domain (optional)
- ✅ Add Google Analytics (optional)

---

## 💡 Pro Tips

1. **Bookmark your dashboards**:
   - Render: https://dashboard.render.com
   - Vercel: https://vercel.com/dashboard
   - MongoDB: https://cloud.mongodb.com

2. **Monitor your app**:
   - Check logs regularly
   - Watch for errors
   - Monitor database usage

3. **Free tier limits**:
   - Render: 750 hours/month
   - Vercel: Unlimited bandwidth
   - MongoDB: 512 MB storage

---

## ✨ Congratulations!

You've successfully deployed DineNow to production! 🎉

Your restaurant management system is now live and accessible worldwide!

---

**Need the detailed guide?** Check `DEPLOYMENT_GUIDE.md`

**Quick reference?** Check `QUICK_DEPLOY.md`

**Pre-deployment checklist?** Check `PRE_DEPLOYMENT_CHECKLIST.md`

---

**Last Updated**: February 2026
**Version**: 1.0.0
