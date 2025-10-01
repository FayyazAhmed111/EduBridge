import AuditLog from "../models/AuditLog.js";

export const audit = async ({ actorId, action, targetId, meta, ip, userAgent }) => {
  try {
    await AuditLog.create({ actorId, action, targetId, meta, ip, userAgent });
  } catch (e) {
    console.error("Audit error:", e.message);
  }
};
