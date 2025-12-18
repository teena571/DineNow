// // import express from "express"
// // import cors from "cors"
// // import { connectDB } from "./config/db.js"
// // import foodRouter from "./routes/foodRoute.js"
// // import userRouter from "./routes/userRoute.js"
// // import 'dotenv/config'
// // import userModel from "./models/userModel.js"
// // import cartRouter from "./routes/cartRoute.js"
// // import orderRouter from "./routes/orderRoute.js"
// // import paymentRouter from "./routes/payment.js"; // ✅ new line
// // import "dotenv/config";

// // const app = express()
// // const port = 4000

// // app.use(express.json())
// // app.use(cors())

// // app.get("/",(req,res) => {
// //     res.send("API Working")
// // })

// // connectDB();

// // app.use("/api/food",foodRouter)
// // app.use("/images",express.static('uploads'))
// // app.use("/api/user",userRouter)
// // app.use("/api/cart",cartRouter)
// // app.use("/api/order",orderRouter)
// // app.use("/api/payment", paymentRouter);

// // app.listen(port,() => {
// //     console.log(`Server Started on http://localhost:${port}`)
// // })




// import express from "express";
// import cors from "cors";
// import { connectDB } from "./config/db.js";
// import foodRouter from "./routes/foodRoute.js";
// import userRouter from "./routes/userRoute.js";
// import "dotenv/config";
// import userModel from "./models/userModel.js";
// import cartRouter from "./routes/cartRoute.js";
// import orderRouter from "./routes/orderRoute.js";
// import paymentRouter from "./routes/payment.js";
// import geminiRouter from "./routes/geminiRoute.js"; 

// const app = express();
// const port = 4000;

// app.use(express.json());
// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("API Working");
// });

// connectDB();

// app.use("/api/food", foodRouter);
// app.use("/images", express.static("uploads"));
// app.use("/api/user", userRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/order", orderRouter);
// app.use("/api/payment", paymentRouter);
// app.use("/api/gemini", geminiRouter); 

// app.listen(port, () => {
//   console.log(`🚀 Server Started on http://localhost:${port}`);
// });





import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import userModel from "./models/userModel.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRouter from "./routes/payment.js";
import geminiRouter from "./routes/geminiRoute.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// CORS configuration: allow frontend origin via env var `FRONTEND_URL` or `CORS_ORIGIN`.
const allowedOrigin = process.env.FRONTEND_URL || process.env.CORS_ORIGIN || "http://localhost:5173";
console.log("CORS allowed origin:", allowedOrigin);
app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API Working");
});

connectDB();

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);

// Gemini route
app.use("/api/gemini", geminiRouter);

app.listen(port, () => {
  console.log(`🚀 Server Started on http://localhost:${port}`);
});
