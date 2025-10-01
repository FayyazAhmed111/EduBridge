import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema(
  {
    // who did the action
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, default: null },
    actorRole: { type: String, enum: ["admin", "mentor", "student", null], default: null },
    actorEmail: { type: String, default: null },

    // what happened
    action: { type: String, required: true, index: true }, // e.g., "auth.login.success", "mentor.approve"
    severity: { type: String, enum: ["info", "low", "medium", "high", "critical"], default: "info" },
    outcome: { type: String, enum: ["success", "fail"], default: "success", index: true },

    // about which target
    targetType: { type: String, index: true },             
    targetId: { type: String, index: true },             

    // context 
    ip: { type: String },
    userAgent: { type: String },
    path: { type: String },
    method: { type: String },
    requestId: { type: String },                           

    // sanitized data about the event
    metadata: { type: Object, default: {} },
    message: { type: String },                   
    immutable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

AuditLogSchema.index({ createdAt: -1 });
AuditLogSchema.index({ action: 1, createdAt: -1 });

export default mongoose.model("AuditLog", AuditLogSchema);
