import mongoose from "mongoose";

const PasswordResetSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  tokenHash: { type: String, required: true }, 
  used: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

PasswordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("PasswordReset", PasswordResetSchema);
