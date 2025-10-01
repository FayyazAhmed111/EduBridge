import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/authMiddleware.js";
import {
  getAllUsers,
  getUserDetails,
  getAllMentors,
  getMentorDetails,
  approveMentor,
  rejectMentor,
  sendNotificationEmail,
  getAuditLogs,
  getUserAuditLogs,
  getAuditLogs, 
  getUserAuditLogs, 
  exportAuditLogs,
  suspendUser, 
  unsuspendUser
} from "../controllers/adminController.js";

const router = express.Router();

// Protect all admin routes
router.use(requireAuth, requireAdmin);

// Users
router.get("/users", getAllUsers);
router.get("/users/:id", getUserDetails);

// Mentors
router.get("/mentors", getAllMentors);
router.get("/mentors/:id", getMentorDetails);
router.post("/mentors/:mentorId/approve", approveMentor);
router.post("/mentors/:mentorId/reject", rejectMentor);

// Notifications
router.post("/notifications/send", sendNotificationEmail);

// Audit Logs
router.get("/audit-logs", requireAuth, requireAdmin, getAuditLogs);
router.get("/audit-logs/:id", requireAuth, requireAdmin, getUserAuditLogs);
router.get("/audit-logs-export", requireAuth, requireAdmin, exportAuditLogs);

// admins can suspend/unsuspend
router.post("/suspend", requireAuth, requireRole("admin"), suspendUser);
router.post("/unsuspend", requireAuth, requireRole("admin"), unsuspendUser);
export default router;
