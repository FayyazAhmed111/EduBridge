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
