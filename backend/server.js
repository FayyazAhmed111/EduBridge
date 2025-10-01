import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import auditRoutes from "./routes/auditRoutes.js";
import scholarshipRoutes from "./routes/scholarshipRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";

dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use("/api/admin/audit", auditRoutes);
app.use("/api/scholarships", scholarshipRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/forum", forumRoutes);
app.get("/", (_req, res) => res.send("EduBridge API Working"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on :${PORT}`));
