Deployment notes

Frontend (Vercel)
- Create a new project on Vercel and point it to this repository.
- Set the Project Root to `frontend`.
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables (if needed) can be set in Vercel dashboard (e.g., API base URL for the backend).

Backend (Render)
- Create a new Web Service on Render (or DigitalOcean/App Service).
- Connect the same repository and set the root to `backend` (or provide a subdirectory build path).
- Build command: leave blank (Node apps usually don't need a build) or `npm install`.
- Start command: `npm start` (this uses `node server.js`).
- Add environment variables in Render dashboard (e.g., `MONGO_URI`, `GEMINI_API_KEY`, `JWT_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`).
- Render will set `PORT` environment variable; the backend now uses `process.env.PORT || 4000`.

Notes
- Keep real secrets out of the repo. Use the `backend/.env.example` placeholders and set actual values in the host dashboards.
- If you want to host both frontend and backend on a single platform, consider using Vercel Functions (requires code changes) or deploy backend as a separate service.
- After deployment, set the frontend to call the backend's public URL and configure CORS if necessary.

Quick local test
- Build frontend locally:
  cd frontend
  npm install
  npm run build

- Run backend locally:
  cd backend
  npm install
  npm start

- Serve frontend in dev mode (for local testing):
  cd frontend
  npm run dev
