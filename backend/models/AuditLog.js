import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema(
  {
    // Who performed the action
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true, default: null },
    actorRole: { type: String, enum: ["admin", "mentor", "student", null], default: null },
    actorEmail: { type: String, default: null },

    // What happened
    action: { type: String, required: true, index: true }, // e.g., "auth.login.success", "mentor.approve"
    severity: { 
      type: String, 
      enum: ["info", "low", "medium", "high", "critical"], 
      default: "info" 
    },
    outcome: { 
      type: String, 
      enum: ["success", "fail"], 
      default: "success", 
      index: true 
    },

    // About which target (what was affected)
    targetType: { type: String, index: true },  // e.g., "user", "scholarship", "forum"
    targetId: { type: String, index: true },

    // Context of request
    ip: { type: String },
    userAgent: { type: String },
    path: { type: String },
    method: { type: String },
    requestId: { type: String },

    // Extra data
    metadata: { type: Object, default: {} },
    message: { type: String },

    // Immutable logs = cannot be altered
    immutable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Indexes for faster queries
AuditLogSchema.index({ createdAt: -1 });
AuditLogSchema.index({ action: 1, createdAt: -1 });
AuditLogSchema.index({ actorId: 1, createdAt: -1 });

export default mongoose.model("AuditLog", AuditLogSchema);
