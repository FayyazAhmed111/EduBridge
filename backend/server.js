// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import { swaggerDocs } from "./config/swagger.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import auditRoutes from "./routes/auditRoutes.js";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";

// Models
import SupportChat from "./models/supportChat.js";

dotenv.config();
await connectDB();

const app = express();
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));

// Swagger Docs
swaggerDocs(app);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/audit", auditRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/support", supportRoutes);

// Health check
app.get("/", (_req, res) => res.send("EduBridge API Working"));

// --- SOCKET.IO SETUP ---
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with frontend domain in production
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  socket.on("join_room", (userId) => {
    socket.join(userId);
    console.log(`User/Admin joined room: ${userId}`);
  });

  socket.on("send_message", async ({ userId, sender, message }) => {
    if (!userId || !message) return;

    // Save to DB
    await SupportChat.findOneAndUpdate(
      { userId },
      { $push: { messages: { sender, message } } },
      { upsert: true, new: true }
    );

    // Broadcast to all in the room
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
server.listen(PORT, () => {
  console.log(`🚀 Server running on :${PORT}`);
  console.log(`📖 Swagger docs available at http://localhost:${PORT}/api/docs`);
});
