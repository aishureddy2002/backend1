// server.js (ES Module version)
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./taskRoutes.js"; // ✅ Update if path differs

dotenv.config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow cross-origin frontend
app.use(express.json()); // Parse incoming JSON

// Health Check Route
app.get("/", (req, res) => {
  res.send("🚀 To-Do App Backend is Live!");
});

// Routes for task operations
app.use("/tasks", taskRoutes);

// MongoDB connection and server start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(PORT, () =>
      console.log(`✅ Server is running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Stop the server if DB fails
  });
