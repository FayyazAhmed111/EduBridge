import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accountType: { type: String, enum: ["student", "mentor", "admin"], default: "student" },
    profilePhoto: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
