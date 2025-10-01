import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema({
  actorId: { type: mongoose.Types.ObjectId, ref: "User" }, 
  action: { type: String, required: true },                
  targetId: { type: mongoose.Types.ObjectId },             
  meta: mongoose.Schema.Types.Mixed,                   
  ip: String,
  userAgent: String,
}, { timestamps: true });

export default mongoose.model("AuditLog", AuditLogSchema);
