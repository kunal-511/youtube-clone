import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();
const port = 3000;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
});

app.get("/health", (req, res) => {
  res.send("Working Fine");
});

app.listen(port, () => {
  connect();
  console.log(`Server is running on port ${port}`);
});

//     mongodb+srv://yoyokvunal:<password>@cluster1.qflc3ip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1
