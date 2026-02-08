Deployment notes

## Environment Variables

### Backend (.env)
- `MONGO_URI`: MongoDB connection string (e.g., mongodb+srv://...)
- `GEMINI_API_KEY`: Google Gemini API key for AI features
- `JWT_SECRET`: Secret key for JWT token signing
- `RAZORPAY_KEY_ID`: Razorpay payment gateway key ID
- `RAZORPAY_KEY_SECRET`: Razorpay payment gateway secret
- `FRONTEND_URLS`: Comma-separated list of allowed frontend URLs (e.g., https://your-frontend.vercel.app,http://localhost:5177)
- `PORT`: Server port (default: 5000)

### Frontend (Vite env vars)
- `VITE_API_URL`: Backend API URL (e.g., https://your-backend.onrender.com/api or http://localhost:5000/api)

### ChatGPT App
- `OPENAI_API_KEY`: OpenAI API key for ChatGPT integration
- `PORT`: Server port (default: 3000)

## Deployment Steps

### Frontend (Vercel)
- Create a new project on Vercel and point it to this repository.
- Set the Project Root to `frontend`.
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: Set `VITE_API_URL` to your backend's public URL.

### Backend (Render)
- Create a new Web Service on Render.
- Connect the repository and set the root to `backend`.
- Build command: `npm install`
- Start command: `npm start`
- Add all backend environment variables in Render dashboard.
- Render will set `PORT` automatically.

### Admin Panel (Vercel or Netlify)
- Similar to frontend, set root to `admin/vite-project`.
- Build command: `npm run build`
- Output directory: `dist`

### ChatGPT App (Render or Heroku)
- Set root to `chatgpt-app`.
- Build command: `npm run build`
- Start command: `npm start`
- Add `OPENAI_API_KEY` and `PORT`.

## Notes
- Keep real secrets out of the repo. Use placeholders in .env.example files.
- Update CORS origins in backend/server.js if deploying to different domains.
- Ensure MongoDB is accessible from your deployment platform.
- Test all integrations locally before deploying.

## Quick Local Test
- Backend: `cd backend && npm install && npm start`
- Frontend: `cd frontend && npm install && npm run dev`
- Admin: `cd admin/vite-project && npm install && npm run dev`
- ChatGPT App: `cd chatgpt-app && npm install && npm run build && npm start`
