import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", index: true, required: true },
  tokenHash: { type: String, required: true },  // store hash of refresh token
  userAgent: String,
  ip: String,
  revokedAt: Date,
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("RefreshToken", RefreshTokenSchema);
