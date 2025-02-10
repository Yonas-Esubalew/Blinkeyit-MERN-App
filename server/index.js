import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
dotenv.config();


import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";


const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
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

app.get("/", (req, res)=>{
    // server to client
    res.json({
        message: `Server is Running On ${PORT}`
    })

}
)

const PORT = 8800 || process.env.PORT;

connectDB().then(()=> {
    app.listen(PORT, () => {
        console.log("Server is Running", PORT);
      });
})

