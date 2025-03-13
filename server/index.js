import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
dotenv.config();

import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import uploadRouter from "./routes/upload.route.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);


// Ensure cookies are set properly
app.get("/check-cookies", (req, res) => {
  console.log("Cookies Received:", req.cookies);
  res.json({ cookies: req.cookies });
});

app.get("/", (req, res) => {
  // server to client
  res.json({
    message: `Server is run Running On ${PORT}`,
  });
});
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter)
app.use("/api/file", uploadRouter)
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is Running", PORT ,"👏");
  });
});
