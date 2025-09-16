import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protect from "./middlewares/authMiddleware.js"; 

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("API is running..."));

app.use("/api/auth", authRoutes);

app.get("/api/protected", protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, you are authorized!` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
