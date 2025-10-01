import express from "express";
import {
  addTestimonial,
  getTestimonials,
  approveTestimonial,
  rejectTestimonial,
} from "../controllers/testimonialController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User
router.post("/", requireAuth, addTestimonial);
router.get("/", requireAuth, getTestimonials);

// Admin
router.put("/:id/approve", requireAuth, requireAdmin, approveTestimonial);
router.put("/:id/reject", requireAuth, requireAdmin, rejectTestimonial);

export default router;
