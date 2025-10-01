import express from "express";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";
import {
  getAuditLogs,
  getAuditLogById,
  getAuditStats,
  exportAuditCsv,
} from "../controllers/auditController.js";

const router = express.Router();

// Admin-only
router.use(requireAuth, requireAdmin);

router.get("/logs", getAuditLogs);
router.get("/logs/:id", getAuditLogById);
router.get("/stats", getAuditStats);
router.get("/export.csv", exportAuditCsv);

export default router;
