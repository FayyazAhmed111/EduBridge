import { Router } from "express";
import {
  login, refreshToken, logout, me,
  registerStudent, registerMentor, registerAdmin,
  sendAdminInviteOtp,
  verifyEmail, resendEmailVerification,
  forgotPassword, resetPassword, changePassword,
  updateProfile, deleteAccount
} from "../controllers/authController.js";

import { requireAuth, requireRole } from "../middleware/authMiddleware.js";
import { loginLimiter, checkBruteforce } from "../middleware/rateLimit.js";

const router = Router();

// Auth core
router.post("/login", loginLimiter, checkBruteforce, login);
router.post("/refresh", refreshToken);        
router.post("/logout", requireAuth, logout); 
router.get("/me", requireAuth, me);      


// Registration
router.post("/register/student", registerStudent);
router.post("/register/mentor", registerMentor);

// Admin invite
router.post("/admin/otp", requireAuth, requireRole("admin"), sendAdminInviteOtp);
router.post("/register/admin", requireAuth, requireRole("admin"), registerAdmin);

// Email verification
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendEmailVerification);

// Password management
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", requireAuth, changePassword);

// Profile management
router.patch("/profile", requireAuth, updateProfile);
router.delete("/account", requireAuth, deleteAccount);



export default router;
