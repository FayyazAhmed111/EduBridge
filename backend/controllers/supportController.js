import SupportTicket from "../models/supportTicket.js";
import SupportChat from "../models/supportChat.js";

// Create support ticket (user side)
export const createTicket = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ticket = await SupportTicket.create({ name, email, message });
    res.status(201).json({ message: "Ticket submitted successfully", ticket });
  } catch (e) {
    res.status(500).json({ message: "Failed to create ticket", error: e.message });
  }
};

// Admin: get all tickets
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch tickets", error: e.message });
  }
};

// Admin: update ticket status
export const updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["open", "in_progress", "closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const ticket = await SupportTicket.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    res.json({ message: "Status updated", ticket });
  } catch (e) {
    res.status(500).json({ message: "Failed to update ticket", error: e.message });
  }
};




// Get chat history by userId
export const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const chat = await SupportChat.findOne({ userId }).populate("userId", "name email role");
    
    if (!chat) {
      return res.status(404).json({ message: "No chat history found" });
    }

    res.json(chat);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch chat history", error: e.message });
  }
};

// Get all chats (for admin dashboard)
export const getAllChats = async (_req, res) => {
  try {
    const chats = await SupportChat.find()
      .populate("userId", "name email role")
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch all chats", error: e.message });
  }
};
