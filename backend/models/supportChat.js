// backend/models/SupportChat.js
import mongoose from "mongoose";

const SupportChatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  messages: [
    {
      sender: { type: String, enum: ["user", "admin"], required: true },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export default mongoose.model("SupportChat", SupportChatSchema);
