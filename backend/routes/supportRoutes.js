import express from "express";
import {
  getContactMessages,
  addContactMessage,
  markReviewed
} from "../controllers/supportController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", addContactMessage);

// Admin-only routes
router.get("/", requireAuth, requireAdmin, getContactMessages);
router.put("/:id/review", requireAuth, requireAdmin, markReviewed);

export default router;
