import express from "express";
import {
  createTicket,
  getAllTickets,
  updateTicketStatus,
  getChatHistory,
  getAllChats
} from "../controllers/supportController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Support Tickets
 *     description: Manage user support tickets
 *   - name: Support Chat
 *     description: Real-time support chat between users and admin
 */

/**
 * @swagger
 * /api/support/tickets:
 *   post:
 *     summary: Create a new support ticket
 *     tags: [Support Tickets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket created successfully
 */
router.post("/tickets", requireAuth, createTicket);

/**
 * @swagger
 * /api/support/tickets:
 *   get:
 *     summary: Get all support tickets (Admin only)
 *     tags: [Support Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tickets
 */
router.get("/tickets", requireAuth, requireAdmin, getAllTickets);

/**
 * @swagger
 * /api/support/tickets/{id}:
 *   patch:
 *     summary: Update ticket status (Admin only)
 *     tags: [Support Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [open, in-progress, resolved, closed]
 *     responses:
 *       200:
 *         description: Ticket status updated
 */
router.patch("/tickets/:id", requireAuth, requireAdmin, updateTicketStatus);

/**
 * @swagger
 * /api/support/{userId}:
 *   get:
 *     summary: Get chat history for a user (Admin or user themselves)
 *     tags: [Support Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chat history
 */
router.get("/:userId", requireAuth, getChatHistory);

/**
 * @swagger
 * /api/support:
 *   get:
 *     summary: Get all chat histories (Admin only)
 *     tags: [Support Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All chat logs
 */
router.get("/", requireAuth, requireAdmin, getAllChats);

export default router;
