import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  purpose: { type: String, required: true },
  codeHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  consumed: { type: Boolean, default: false }
}, { timestamps: true });

OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Otp", OtpSchema);
