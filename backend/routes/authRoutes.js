import { Router } from "express";
import {
  login,
  me,
  registerStudent,
  registerMentor,
  sendAdminInviteOtp,
  registerAdmin
} from "../controllers/authController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = Router();

// Auth
router.post("/login", login);
router.get("/me", requireAuth, me);
// Student
router.post("/register/student", registerStudent);
// Mentor
router.post("/register/mentor", registerMentor);
// Admin
router.post("/admin/send-otp", requireAuth, requireRole("admin"), sendAdminInviteOtp);
router.post("/admin/register", requireAuth, requireRole("admin"), registerAdmin);

export default router;
