# ⚡ Quick Deploy - DineNow

## 🚀 Deploy in 10 Minutes

### Step 1: Deploy Backend (Render) - 5 minutes

1. **Go to**: https://render.com
2. **Sign up** with GitHub
3. **New Web Service** → Select `DineNow` repo
4. **Configure**:
   ```
   Name: dinenow-backend
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```
5. **Add Environment Variables**:
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb+srv://teenarai571_db_user:TeenaRaiKattri@cluster.hynxywh.mongodb.net/DineNow
   JWT_SECRET=02dec274d913a0141c8dff155f63f3ef214bdb96d983ce46536cc2f41d377566
   JWT_REFRESH_SECRET=a8f5e2c9b1d4f7e3a6c8b2d5f9e1c4a7b3d6f8e2c5a9b1d4f7e3a6c8b2d5f9e1
   GEMINI_API_KEY=AIzaSyATvAkMPZSA15x7WJEY1kHG8SPy63N_m2Y
   FRONTEND_URL=https://your-app.vercel.app
   ```
6. **Deploy** → Copy your backend URL

---

### Step 2: Deploy Frontend (Vercel) - 5 minutes

1. **Go to**: https://vercel.com
2. **Sign up** with GitHub
3. **Import Project** → Select `DineNow` repo
4. **Configure**:
   ```
   Framework: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```
5. **Add Environment Variables**:
   ```
   VITE_API_URL=https://your-backend.onrender.com/api
   VITE_FRONTEND_URL=https://your-app.vercel.app
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```
6. **Deploy** → Copy your frontend URL

---

### Step 3: Update Backend FRONTEND_URL

1. Go back to **Render**
2. Update `FRONTEND_URL` with your Vercel URL
3. Save → Auto redeploys

---

## ✅ Done!

Your app is live at: `https://your-app.vercel.app`

---

## 🔥 Important Notes

1. **MongoDB Atlas**: Make sure Network Access allows `0.0.0.0/0`
2. **First Load**: Render free tier sleeps - first request takes 30-60 seconds
3. **Auto Deploy**: Push to GitHub → Auto deploys both frontend & backend

---

## 🧪 Test Your Deployment

```bash
# Test backend
curl https://your-backend.onrender.com/api/food/list

# Test frontend
Open: https://your-app.vercel.app
```

---

## 📱 Share Your App

Send this link to anyone:
```
https://your-app.vercel.app
```

They can access your restaurant management system from anywhere! 🎉
