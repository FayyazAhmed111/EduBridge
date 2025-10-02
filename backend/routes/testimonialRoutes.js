import express from "express";
import {
  addTestimonial,
  getTestimonials,
  approveTestimonial,
  rejectTestimonial,
} from "../controllers/testimonialController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Testimonials
 *     description: User testimonials about the platform
 */

/**
 * @swagger
 * /api/testimonials:
 *   post:
 *     summary: Add a new testimonial
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "EduBridge helped me get a scholarship abroad!"
 *     responses:
 *       201:
 *         description: Testimonial submitted (pending approval)
 */
router.post("/", requireAuth, addTestimonial);

/**
 * @swagger
 * /api/testimonials:
 *   get:
 *     summary: Get all testimonials
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of testimonials
 */
router.get("/", requireAuth, getTestimonials);

/**
 * @swagger
 * /api/testimonials/{id}/approve:
 *   put:
 *     summary: Approve a testimonial (Admin only)
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Testimonial ID
 *     responses:
 *       200:
 *         description: Testimonial approved
 */
router.put("/:id/approve", requireAuth, requireAdmin, approveTestimonial);

/**
 * @swagger
 * /api/testimonials/{id}/reject:
 *   put:
 *     summary: Reject a testimonial (Admin only)
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Testimonial ID
 *     responses:
 *       200:
 *         description: Testimonial rejected
 */
router.put("/:id/reject", requireAuth, requireAdmin, rejectTestimonial);

export default router;
