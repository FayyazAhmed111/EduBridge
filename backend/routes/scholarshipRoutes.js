// backend/routes/scholarshipRoutes.js
import express from "express";
import {
  getAllScholarships,
  getSuggestedScholarships,
  searchScholarships,
} from "../controllers/scholarshipController.js";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";

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
router.get("/", requireAuth, getAllScholarships);

/**
 * @swagger
 * /api/scholarships/suggested:
 *   get:
 *     summary: Get suggested scholarships for the logged-in student
 *     description: Uses the student's profile (level, fieldOfStudy, GPA) to return relevant scholarships.
 *     tags: [Scholarships]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of suggested scholarships
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 *                   example: 2
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: Tech Innovators Full Scholarship
 *                       field:
 *                         type: string
 *                         example: Computer Science
 *                       eligibleLevel:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: [ "University" ]
 *                       minGPA:
 *                         type: number
 *                         example: 3.2
 *                       funding:
 *                         type: string
 *                         example: Fully Funded
 *       400:
 *         description: Missing or incomplete student profile
 *       403:
 *         description: Not authorized (only students allowed)
 *       500:
 *         description: Server error
 */
router.get("/suggested", requireAuth, requireRole("student"), getSuggestedScholarships);

/**
 * @swagger
 * /api/scholarships/search:
 *   get:
 *     summary: Search scholarships with filters
 *     tags: [Scholarships]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Free text search
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *         description: Education level filter
 *       - in: query
 *         name: field
 *         schema:
 *           type: string
 *         description: Field of study filter
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: Country filter
 *       - in: query
 *         name: funding
 *         schema:
 *           type: string
 *         description: Funding type filter (Fully Funded, Partial, etc.)
 *     responses:
 *       200:
 *         description: Filtered list of scholarships
 */
router.get("/search", searchScholarships);

export default router;
