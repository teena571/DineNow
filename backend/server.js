


// import express from "express";
// import cors from "cors";
// import { connectDB } from "./config/db.js";
// import foodRouter from "./routes/foodRoute.js";
// import userRouter from "./routes/userRoute.js";
// import "dotenv/config";
// import userModel from "./models/userModel.js";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";
// import geminiRouter from "./routes/geminiRoute.js";
// import tableRouter from "./routes/tableRoute.js";

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(express.json());

// // CORS configuration: support a comma-separated list in `FRONTEND_URLS`
// // Fallbacks: `FRONTEND_URL`, `CORS_ORIGIN`, or localhost for local dev.
// const rawAllowed = process.env.FRONTEND_URLS || process.env.FRONTEND_URL || process.env.CORS_ORIGIN || "http://localhost:5173,http://localhost:5175,http://localhost:5176,http://localhost:5177,http://localhost:5180,http://localhost:5183,http://192.168.56.1:5173,http://10.48.105.158:5173,http://192.168.0.208:5173";
// const allowedOrigins = rawAllowed.split(",").map(s => s.trim()).filter(Boolean);
// console.log("CORS allowed origins:", allowedOrigins);

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps, curl, or server-to-server)
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       return callback(null, true);
//     }
//     return callback(new Error("CORS policy: origin not allowed"), false);
//   },
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   credentials: true,
// }));

// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// connectDB();

// // Seed tables on server start
// const seedTables = async () => {
//   try {
//     const tableModel = (await import('./models/tableModel.js')).default;
//     const existingTables = await tableModel.find();
//     if (existingTables.length === 0) {
//       console.log('Seeding tables...');
//       const tables = [];
//       for (let i = 1; i <= 20; i++) {
//         tables.push({ tableNo: i, status: 'available' });
//       }
//       await tableModel.insertMany(tables);
//       console.log('Tables seeded successfully');
//     } else {
//       console.log(`Tables already exist: ${existingTables.length}`);
//     }
//   } catch (error) {
//     console.error('Error seeding tables:', error);
//   }
// };

// seedTables();

// app.use("/api/food", foodRouter);
// app.use("/images", express.static("uploads"));
// app.use("/api/user", userRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);

// // Gemini route
// app.use("/api/gemini", geminiRouter);

// // Table route
// app.use("/api/tables", tableRouter);

// // Trigger nodemon restart after fixing syntax error
// app.listen(port, '0.0.0.0', () => {
//   console.log(`🚀 Server Started on http://0.0.0.0:${port}`);
// });








import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import authRouter from "./routes/authRoutes.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import geminiRouter from "./routes/geminiRoute.js";
import tableRouter from "./routes/tableRoute.js";

const app = express();
const port = process.env.PORT || 5000;

// ============================
// Security Middleware
// ============================

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting - More permissive for development
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased for development
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Increased from 5 to 50 for development
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
});

// Apply rate limiters
app.use('/api/', limiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// ============================
// Body Parser & Cookie Parser
// ============================

app.use(express.json());
app.use(cookieParser());

// ============================
// CORS Configuration
// ============================

// Build allowed origins from environment variables
const frontendUrls = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : [];

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  ...frontendUrls
].filter(Boolean);

console.log('🌐 CORS allowed origins:', allowedOrigins);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin) {
      console.log('✅ CORS: No origin (server-to-server or tool)');
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      console.log('✅ CORS allowed:', origin);
      callback(null, true);
    } else {
      console.log('⚠️ CORS origin not in whitelist:', origin);
      console.log('   Allowed origins:', allowedOrigins);
      // Allow anyway for now, but log it
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'token'],
  exposedHeaders: ['Content-Length', 'X-Request-Id'],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false
}));


// ============================
// Root route
// ============================

app.get("/", (req, res) => {
  res.send("API Working 🚀");
});


// ============================
// DB connection
// ============================

connectDB();


// ============================
// Seed tables on first run
// ============================

const seedTables = async () => {
  try {
    const tableModel = (await import("./models/tableModel.js")).default;

    const existingTables = await tableModel.find();

    if (existingTables.length === 0) {
      console.log("Seeding tables...");

      const tables = [];
      for (let i = 1; i <= 20; i++) {
        tables.push({ tableNo: i, status: "available" });
      }

      await tableModel.insertMany(tables);

      console.log("Tables seeded successfully ✅");
    } else {
      console.log(`Tables already exist: ${existingTables.length}`);
    }
  } catch (error) {
    console.error("Error seeding tables:", error);
  }
};

seedTables();


// ============================
// Routes
// ============================

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/gemini", geminiRouter);
app.use("/api/tables", tableRouter);


// ============================
// Start server
// ============================

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server Started on http://localhost:${port}`);
});
