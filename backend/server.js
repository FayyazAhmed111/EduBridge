// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http"; 
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import auditRoutes from "./routes/auditRoutes.js";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import SupportChat from "./models/supportChat.js";
import supportRoutes from "./routes/supportRoutes.js";
dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// API Routes
app.use("/api/admin/audit", auditRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/support", supportRoutes);
app.get("/", (_req, res) => res.send("EduBridge API Working"));

// --- SOCKET.IO SETUP ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // replace with frontend domain in prod
    methods: ["GET", "POST"],
  },
});

// When a client connects
io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  // Join a room (based on userId)
  socket.on("join_room", (userId) => {
    socket.join(userId);
    console.log(`User/Admin joined room: ${userId}`);
  });

  // Handle new messages
  socket.on("send_message", async ({ userId, sender, message }) => {
    if (!userId || !message) return;

    // Save message to DB
    const chat = await SupportChat.findOneAndUpdate(
      { userId },
      { $push: { messages: { sender, message } } },
      { upsert: true, new: true }
    );

    // Emit to all in the room (user + admin)
    io.to(userId).emit("receive_message", {
      sender,
      message,
      timestamp: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on :${PORT}`));
