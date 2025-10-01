import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import { auditLog } from "../services/auditService.js";

// -------------------- QUESTIONS --------------------

// Ask a new question
export const askQuestion = async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    if (!title || !body) return res.status(400).json({ message: "Title and body required" });

    const question = await Question.create({
      userId: req.user._id,
      title,
      body,
      tags,
    });

    res.status(201).json(question);

    await auditLog(req, {
      action: "forum.question.add",
      targetType: "question",
      targetId: question._id,
      message: "User asked a question",
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to post question", error: e.message });
  }
};

// Get all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("userId", "name role");
    res.json(questions);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch questions", error: e.message });
  }
};

// Get single question (with answers)
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("userId", "name role");
    if (!question) return res.status(404).json({ message: "Not found" });

    const answers = await Answer.find({ questionId: question._id }).populate("userId", "name role");
    res.json({ question, answers });
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch question", error: e.message });
  }
};

// Delete question (admin only)
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Not found" });

    await question.deleteOne();
    await Answer.deleteMany({ questionId: question._id });

    res.json({ message: "Question and related answers deleted" });

    await auditLog(req, {
      action: "forum.question.delete",
      targetType: "question",
      targetId: question._id,
      message: "Question deleted by admin",
      severity: "high",
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to delete question", error: e.message });
  }
};

// -------------------- ANSWERS --------------------

// Post answer
export const postAnswer = async (req, res) => {
  try {
    const { body } = req.body;
    if (!body) return res.status(400).json({ message: "Answer body required" });

    const question = await Question.findById(req.params.qid);
    if (!question) return res.status(404).json({ message: "Question not found" });

    const answer = await Answer.create({
      questionId: question._id,
      userId: req.user._id,
      body,
    });

    res.status(201).json(answer);

    await auditLog(req, {
      action: "forum.answer.add",
      targetType: "answer",
      targetId: answer._id,
      message: "User posted an answer",
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to post answer", error: e.message });
  }
};

// Accept answer (question owner)
export const acceptAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.aid).populate("questionId");
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    if (answer.questionId.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Only question owner can accept answers" });
    }

    answer.isAccepted = true;
    await answer.save();

    res.json({ message: "Answer accepted", answer });

    await auditLog(req, {
      action: "forum.answer.accept",
      targetType: "answer",
      targetId: answer._id,
      message: "Answer accepted by question owner",
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to accept answer", error: e.message });
  }
};

// Delete answer (admin or answer owner)
export const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.aid);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    if (req.user.role !== "admin" && answer.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await answer.deleteOne();
    res.json({ message: "Answer deleted" });

    await auditLog(req, {
      action: "forum.answer.delete",
      targetType: "answer",
      targetId: answer._id,
      message: "Answer deleted",
      severity: "medium",
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to delete answer", error: e.message });
  }
};
