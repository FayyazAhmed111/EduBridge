import express from "express";
import { createTicket, getAllTickets, updateTicketStatus, getChatHistory, getAllChats } from "../controllers/supportController.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// User create ticket
router.post("/tickets", createTicket);

// Admin manage tickets
router.get("/tickets", requireAuth, requireAdmin, getAllTickets);
router.patch("/tickets/:id", requireAuth, requireAdmin, updateTicketStatus);

// User/Admin can get their chat
router.get("/:userId", requireAuth, getChatHistory);

// Admin can view all user chats
router.get("/", requireAuth, requireAdmin, getAllChats);

export default router;   