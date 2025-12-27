import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js"; // Note: ESM often requires file extensions
import cors from "cors";
import userRoutes from "./routes/user/user.route.js";
import todoRoutes from "./routes/todo/todo.route.js";
import errorHandler from "./middleware/error.middleware.js";
import multer from "multer";
// Initialize app
const app = express();

// Middlewares
// Trust proxy for correct protocol detection behind Render/Vercel
app.set("trust proxy", 1);
// CORS middleware - allow your frontend dev server
const allowedOrigins = [
  "http://localhost:3000",
  "https://tts-todos-nextjs.vercel.app",
  process.env.FRONTEND_URL,
  ...(process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",").map((o) => o.trim())
    : []),
].filter(Boolean);
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "x-better-auth",
      "x-better-auth-csrf",
    ],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/api/todos", upload.none());

// Routes
app.all("/api/auth/*splat", toNodeHandler(auth)); // For ExpressJS v5 for better auth
// sign-in/email for sign in
// sign-up/email for sign up
app.use("/api/users", userRoutes); // Use the userRouter
app.use("/api/todos", todoRoutes); // Use the userRouter

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "API is running...",
    documentation: "/api/docs",
    version: "1.0.0",
  });
});

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Error handler middleware
app.use(errorHandler);

export default app;
