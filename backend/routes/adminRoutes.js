import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  restoreUser,
  getAllMentors,
  getMentorById,
  approveMentor,
  rejectMentor,
  notifyUsers,
  getAuditLogs,
  getUserAuditLogs,
  exportAuditLogs,
  suspendUser,
  unsuspendUser
} from "../controllers/adminController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are admin-protected
router.use(requireAuth, requireAdmin);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management APIs
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter by role (student/mentor/admin)
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Search by email
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Search by name
 *       - in: query
 *         name: organization
 *         schema:
 *           type: string
 *         description: Search by mentor organization
 *     responses:
 *       200:
 *         description: List of users
 */

/**
 * @swagger
 * /api/admin/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User details
 */

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Soft delete a user
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User soft deleted
 */

/**
 * @swagger
 * /api/admin/users/{id}/restore:
 *   patch:
 *     summary: Restore a soft deleted user
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User restored
 */

/**
 * @swagger
 * /api/admin/mentors:
 *   get:
 *     summary: Get all mentors
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *     responses:
 *       200:
 *         description: List of mentors
 */

/**
 * @swagger
 * /api/admin/mentors/{id}:
 *   get:
 *     summary: Get mentor details
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mentor details
 */

/**
 * @swagger
 * /api/admin/mentors/{id}/approve:
 *   patch:
 *     summary: Approve a mentor
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mentor approved
 */

/**
 * @swagger
 * /api/admin/mentors/{id}/reject:
 *   patch:
 *     summary: Reject a mentor
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 description: Reason for rejection
 *     responses:
 *       200:
 *         description: Mentor rejected and rolled back
 */

/**
 * @swagger
 * /api/admin/notify:
 *   post:
 *     summary: Send email notifications
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipients:
 *                 type: array
 *                 items:
 *                   type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notifications sent
 */

/**
 * @swagger
 * /api/admin/audit:
 *   get:
 *     summary: Get all audit logs
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *       - in: query
 *         name: outcome
 *         schema:
 *           type: string
 *       - in: query
 *         name: severity
 *         schema:
 *           type: string
 *           enum: [low, medium, high, info]
 *     responses:
 *       200:
 *         description: List of audit logs
 */

/**
 * @swagger
 * /api/admin/audit/user/{id}:
 *   get:
 *     summary: Get audit logs for a specific user
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User audit logs
 */

/**
 * @swagger
 * /api/admin/audit/export:
 *   get:
 *     summary: Export audit logs (JSON or CSV)
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [json, csv]
 *     responses:
 *       200:
 *         description: Exported logs
 */

/**
 * @swagger
 * /api/admin/suspend:
 *   post:
 *     summary: Suspend a user
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               reason:
 *                 type: string
 *               otp:
 *                 type: string
 *                 description: Required only when suspending an admin
 *     responses:
 *       200:
 *         description: User suspended
 */

/**
 * @swagger
 * /api/admin/unsuspend:
 *   post:
 *     summary: Unsuspend a user
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               otp:
 *                 type: string
 *                 description: Required only when unsuspending an admin
 *     responses:
 *       200:
 *         description: User unsuspended
 */

// ---------- USERS ----------
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/restore", restoreUser);

// ---------- MENTORS ----------
router.get("/mentors", getAllMentors);
router.get("/mentors/:id", getMentorById);
router.patch("/mentors/:id/approve", approveMentor);
router.patch("/mentors/:id/reject", rejectMentor);

// ---------- NOTIFICATIONS ----------
router.post("/notify", notifyUsers);

// ---------- AUDIT LOGS ----------
router.get("/audit", getAuditLogs);
router.get("/audit/user/:id", getUserAuditLogs);
router.get("/audit/export", exportAuditLogs);

// ---------- SUSPEND / UNSUSPEND ----------
router.post("/suspend", suspendUser);
router.post("/unsuspend", unsuspendUser);

export default router;
