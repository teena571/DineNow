


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
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import geminiRouter from "./routes/geminiRoute.js";
import tableRouter from "./routes/tableRoute.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());


// ============================
// ✅ FIXED CORS (ALLOW ALL PORTS)
// ============================
// ❌ Removed whitelist logic
// ✅ Allow everything (dev friendly)

app.use(cors());


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
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/gemini", geminiRouter);
app.use("/api/tables", tableRouter);


// ============================
// Start server
// ============================

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server Started on http://localhost:${port}`);
});
