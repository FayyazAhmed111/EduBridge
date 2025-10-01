import express from "express";
import { getScholarships } from "../controllers/scholarshipController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, getScholarships);

export default router;
