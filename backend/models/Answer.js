import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    body: { type: String, required: true },
    isAccepted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Answer", answerSchema);
