// models/SupportTicket.js
import mongoose from "mongoose";

const SupportTicketSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ["open", "in_progress", "closed"],
    default: "open"
  },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("SupportTicket", SupportTicketSchema);
