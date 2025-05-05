import cors from "cors";
import express from "express";
import { connectDB } from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import codeRoutes from "./routes/codeExecution.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Allow only your Vercel frontend and localhost
const allowedOrigins = [
  "https://byte-code-yt22-git-main-mohammed-imthihyazs-projects.vercel.app",
  "http://localhost:5173"
];

// ✅ CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);


app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});


app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/codes", codeRoutes);


app.get("/", (req, res) => {
  res.status(200).send("Welcome to root URL of Server");
});


app.listen(PORT, async () => {
  await connectDB();
  console.log("✅ Server running on port", PORT);
});
