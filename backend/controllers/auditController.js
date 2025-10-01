// controllers/auditController.js
import AuditLog from "../models/AuditLog.js";

// GET /api/admin/audit/logs
export const getAuditLogs = async (req, res) => {
  try {
    const {
      q,
      action,
      outcome,
      severity,
      actorId,
      targetType,
      targetId,
      from,
      to,
      page = 1,
      limit = 20,
      sort = "-createdAt",
    } = req.query;

    const filter = {};
    if (action) filter.action = action;
    if (outcome) filter.outcome = outcome;
    if (severity) filter.severity = severity;
    if (actorId) filter.actorId = actorId;
    if (targetType) filter.targetType = targetType;
    if (targetId) filter.targetId = targetId;

    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    if (q) {
      // very simple text search-ish: match in message or actorEmail
      filter.$or = [
        { message: new RegExp(q, "i") },
        { actorEmail: new RegExp(q, "i") },
        { action: new RegExp(q, "i") },
        { targetId: new RegExp(q, "i") },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      AuditLog.find(filter).sort(sort).skip(skip).limit(Number(limit)).lean(),
      AuditLog.countDocuments(filter),
    ]);

    res.json({
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
      items,
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch logs", error: e.message });
  }
};

// GET /api/admin/audit/logs/:id
export const getAuditLogById = async (req, res) => {
  try {
    const log = await AuditLog.findById(req.params.id).lean();
    if (!log) return res.status(404).json({ message: "Log not found" });
    res.json(log);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch log", error: e.message });
  }
};

// GET /api/admin/audit/stats  (basic quick stats)
export const getAuditStats = async (req, res) => {
  try {
    const { from, to } = req.query;
    const filter = {};
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    const byAction = await AuditLog.aggregate([
      { $match: filter },
      { $group: { _id: "$action", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 25 },
    ]);

    const outcomes = await AuditLog.aggregate([
      { $match: filter },
      { $group: { _id: "$outcome", count: { $sum: 1 } } },
    ]);

    res.json({ byAction, outcomes });
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch stats", error: e.message });
  }
};

// GET /api/admin/audit/export.csv
export const exportAuditCsv = async (req, res) => {
  try {
    const { q, action, outcome, severity, actorId, targetType, targetId, from, to } = req.query;

    const filter = {};
    if (action) filter.action = action;
    if (outcome) filter.outcome = outcome;
    if (severity) filter.severity = severity;
    if (actorId) filter.actorId = actorId;
    if (targetType) filter.targetType = targetType;
    if (targetId) filter.targetId = targetId;
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }
    if (q) {
      filter.$or = [
        { message: new RegExp(q, "i") },
        { actorEmail: new RegExp(q, "i") },
        { action: new RegExp(q, "i") },
        { targetId: new RegExp(q, "i") },
      ];
    }

    const items = await AuditLog.find(filter).sort("-createdAt").lean();

    // Simple CSV
    const headers = [
      "createdAt",
      "actorId",
      "actorRole",
      "actorEmail",
      "action",
      "outcome",
      "severity",
      "targetType",
      "targetId",
      "ip",
      "userAgent",
      "path",
      "method",
      "message",
    ];
    const csvRows = [
      headers.join(","),
      ...items.map((r) =>
        headers
          .map((h) => {
            let v = r[h] ?? "";
            if (typeof v === "string") {
              v = v.replace(/"/g, '""'); // escape quotes
              return `"${v}"`;
            }
            return `"${v}"`;
          })
          .join(",")
      ),
    ];
    const csv = csvRows.join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="audit-logs.csv"`);
    res.send(csv);
  } catch (e) {
    res.status(500).json({ message: "Failed to export logs", error: e.message });
  }
};