import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    adminResponse: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
