// import mongoose from "mongoose";

// export const connectDB = async() => {
//     await mongoose.connect('mongodb+srv://teenarai571_db_user:G9CB9tyYNFolMmPZ@cluster.hynxywh.mongodb.net/DineNow').then(() => console.log("DB Connected"))
// }


import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb+srv://teenarai571_db_user:G9CB9tyYNFolMmPZ@cluster.hynxywh.mongodb.net/DineNow';
    await mongoose.connect(
      mongoUri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log("DB Connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // stop server if DB fails
  }
};

// PAts23xW8EOCbO7p
