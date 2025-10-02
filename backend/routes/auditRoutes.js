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

/**
 * @swagger
 * tags:
 *   name: Audit
 *   description: Admin audit log management
 */

/**
 * @swagger
 * /api/admin/audit/logs:
 *   get:
 *     summary: Get all audit logs
 *     tags: [Audit]
 *     parameters:
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *         description: Filter by action keyword
 *       - in: query
 *         name: severity
 *         schema:
 *           type: string
 *           enum: [low, medium, high, info]
 *         description: Filter by severity
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: Filter by userId
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date range
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date range
 *     responses:
 *       200:
 *         description: List of audit logs
 */

/**
 * @swagger
 * /api/admin/audit/logs/{id}:
 *   get:
 *     summary: Get a specific audit log by ID
 *     tags: [Audit]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Audit log ID
 *     responses:
 *       200:
 *         description: Audit log details
 *       404:
 *         description: Audit log not found
 */

/**
 * @swagger
 * /api/admin/audit/stats:
 *   get:
 *     summary: Get aggregated audit log statistics
 *     tags: [Audit]
 *     responses:
 *       200:
 *         description: Audit statistics summary
 */

/**
 * @swagger
 * /api/admin/audit/export.csv:
 *   get:
 *     summary: Export audit logs in CSV format
 *     tags: [Audit]
 *     responses:
 *       200:
 *         description: Downloadable CSV file of audit logs
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 */

// ---------- ROUTES ----------
router.get("/logs", getAuditLogs);
router.get("/logs/:id", getAuditLogById);
router.get("/stats", getAuditStats);
router.get("/export.csv", exportAuditCsv);

export default router;
