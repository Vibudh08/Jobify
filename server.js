const app = express();
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// only show logs in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// middleware
app.use(cookieParser());
app.use(express.json());

// test routes
// app.get("/", (req, res) => {
//   res.send("Hello World from Jobify backend");
// });

// app.get("/api/v1/test", (req, res) => {
//   res.json({ msg: "test route" });
// });

// api routes
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);
console.log("NODE_ENV:", process.env.NODE_ENV);

// 🧩 Serve React build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// error handling
app.use(errorHandlerMiddleware);

// server + DB connect
const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(` Server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(" MongoDB connection error:", error);
  process.exit(1);
}
