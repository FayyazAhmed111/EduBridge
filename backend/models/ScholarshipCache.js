// models/ScholarshipCache.js
import mongoose from "mongoose";

const ScholarshipCacheSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    suggestions: { type: Array, default: [] },
    model: { type: String, default: "fallback-filter" },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

ScholarshipCacheSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

export default mongoose.model("ScholarshipCache", ScholarshipCacheSchema);
