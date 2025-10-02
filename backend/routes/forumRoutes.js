import express from "express";
import {
  askQuestion,
  getQuestions,
  getQuestionById,
  deleteQuestion,
  postAnswer,
  acceptAnswer,
  deleteAnswer,
} from "../controllers/forumController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Forum
 *   description: Q&A forum for students and mentors
 */

/**
 * @swagger
 * /api/forum/questions:
 *   post:
 *     summary: Ask a new question
 *     tags: [Forum]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Question created successfully
 *
 *   get:
 *     summary: Get all questions
 *     tags: [Forum]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of questions
 */

/**
 * @swagger
 * /api/forum/questions/{id}:
 *   get:
 *     summary: Get a question by ID
 *     tags: [Forum]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question details
 *
 *   delete:
 *     summary: Delete a question (Admin only)
 *     tags: [Forum]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question deleted
 */

/**
 * @swagger
 * /api/forum/questions/{qid}/answers:
 *   post:
 *     summary: Post an answer to a question
 *     tags: [Forum]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: qid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Answer posted
 */

/**
 * @swagger
 * /api/forum/answers/{aid}/accept:
 *   put:
 *     summary: Accept an answer for a question
 *     tags: [Forum]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Answer accepted
 */

/**
 * @swagger
 * /api/forum/answers/{aid}:
 *   delete:
 *     summary: Delete an answer
 *     tags: [Forum]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Answer deleted
 */

// ---------- Routes ----------

// Questions
router.post("/questions", requireAuth, askQuestion);
router.get("/questions", requireAuth, getQuestions);
router.get("/questions/:id", requireAuth, getQuestionById);
router.delete("/questions/:id", requireAuth, requireAdmin, deleteQuestion);

// Answers
router.post("/questions/:qid/answers", requireAuth, postAnswer);
router.put("/answers/:aid/accept", requireAuth, acceptAnswer);
router.delete("/answers/:aid", requireAuth, deleteAnswer);

export default router;
