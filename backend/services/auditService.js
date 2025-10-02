// services/auditService.js
import AuditLog from "../models/AuditLog.js";

// Redact sensitive fields
const redact = (obj) => {
  if (!obj || typeof obj !== "object") return obj;
  const clone = JSON.parse(JSON.stringify(obj));
  const sensitiveKeys = ["password", "newpassword", "oldpassword", "token", "resettoken", "code"];
  
  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    for (const k of Object.keys(node)) {
      if (sensitiveKeys.includes(k.toLowerCase())) {
        node[k] = "[REDACTED]";
      } else if (typeof node[k] === "object") {
        walk(node[k]);
      }
    }
  };
  
  walk(clone);
  return clone;
};

/**
 * Write an audit log. Call from controllers/services.
 * @param {Request|null} req  - Express request or null
 * @param {Object} payload    - { action, outcome, severity, targetType, targetId, message, metadata }
 */
export const auditLog = async (req, payload = {}) => {
  try {
    const {
      action,
      outcome = "success",
      severity = "info",
      targetType,
      targetId,
      message,
      metadata = {},
    } = payload;

    const actorId = req?.user?._id ?? null;
    const actorRole = req?.user?.role ?? null;
    const actorEmail = req?.user?.email ?? null;

    const ip =
      req?.headers?.["x-forwarded-for"]?.toString().split(",")[0]?.trim() ||
      req?.socket?.remoteAddress ||
      null;

    const log = new AuditLog({
      actorId,
      actorRole,
      actorEmail,
      action,
      severity,
      outcome,
      targetType: targetType ?? null,
      targetId: targetId ? targetId.toString() : null,
      ip,
      userAgent: req?.headers?.["user-agent"] ?? null,
      path: req?.originalUrl ?? null,
      method: req?.method ?? null,
      requestId: req?.id ?? null,
      message,
      metadata: redact(metadata),
    });

    await log.save();
  } catch (err) {
    console.error(" Audit log failed:", err.message);
  }
};
