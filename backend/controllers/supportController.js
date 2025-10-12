import SupportTicket from "../models/supportTicket.js";
import SupportChat from "../models/supportChat.js";
import Contact from "../models/Contact.js";
import { auditLog } from "../services/auditService.js";
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


// Add new contact message
export const addContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ message: "All fields are required" });

    const newMessage = await Contact.create({ name, email, message });

    res.status(201).json({
      message: "Message sent successfully",
      contact: newMessage,
    });

    // Optional audit
    if (req.user)
      await auditLog(req, {
        action: "contact.add",
        targetType: "contact",
        targetId: newMessage._id,
        message: `Contact form submitted by ${name}`,
      });
  } catch (e) {
    console.error("Error adding contact message:", e);
    res.status(500).json({
      message: "Failed to send message",
      error: e.message,
    });
  }
};

// Admin: View all messages
export const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (e) {
    res.status(500).json({
      message: "Failed to fetch contact messages",
      error: e.message,
    });
  }
};

// Admin: Mark message as reviewed
export const markReviewed = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Message not found" });

    contact.status = "reviewed";
    await contact.save();

    res.json({ message: "Marked as reviewed", contact });
  } catch (e) {
    res.status(500).json({ message: "Failed to update message", error: e.message });
  }
};
