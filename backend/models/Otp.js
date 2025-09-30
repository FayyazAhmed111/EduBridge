import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true },    // recipient (static email for admin flow)
  purpose: { type: String, required: true },  // e.g., "admin_invite"
  codeHash: { type: String, required: true }, // bcrypt hash of 6-digit code
  expiresAt: { type: Date, required: true },
  consumed: { type: Boolean, default: false }
}, { timestamps: true });

OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // auto-clean when expired

export default mongoose.model("Otp", OtpSchema);
