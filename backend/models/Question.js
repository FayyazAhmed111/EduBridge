import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: [{ type: String }],
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
