import express from "express";
import { getScholarships } from "../controllers/scholarshipController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Scholarships
 *   description: Manage and fetch scholarship opportunities
 */

/**
 * @swagger
 * /api/scholarships:
 *   get:
 *     summary: Get all available scholarships
 *     tags: [Scholarships]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of scholarships
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   provider:
 *                     type: string
 *                   deadline:
 *                     type: string
 *                     format: date
 */

router.get("/", requireAuth, getScholarships);

export default router;
