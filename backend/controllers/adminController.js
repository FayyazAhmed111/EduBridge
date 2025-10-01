import User from "../models/User.js";
import Otp from "../models/Otp.js";
import { compare } from "bcryptjs";
import { sendMail } from "../config/mailer.js";
import { auditLog } from "../services/auditService.js";
import AuditLog from "../models/AuditLog.js";
import { Parser } from "json2csv";

// ---------- USERS ----------
// Get all users (with filters)
export const getAllUsers = async (req, res) => {
    try {
        const { role, email, name, organization, status } = req.query;

        let filter = {};
        if (role) filter.role = role;
        if (email) filter.email = new RegExp(email, "i");
        if (name) filter.name = new RegExp(name, "i");
        if (organization) filter["mentorProfile.organization"] = new RegExp(organization, "i");
        if (status) filter["mentorProfile.status"] = status;

        const users = await User.find(filter).select("-password -refreshTokens");
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: "Failed to fetch users", error: e.message });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password -refreshTokens");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: "Failed to fetch user", error: e.message });
    }
};

// Soft delete user
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.role === "admin") {
            return res.status(403).json({ message: "Cannot delete admin accounts" });
        }

        user.isDeleted = true;
        user.deletedAt = new Date();
        await user.save();

        res.json({ message: "User deleted (soft)", user });
    } catch (e) {
        res.status(500).json({ message: "Failed to delete user", error: e.message });
    }
};

// Restore soft deleted user
export const restoreUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.isDeleted = false;
        user.deletedAt = null;
        await user.save();

        res.json({ message: "User restored", user });
    } catch (e) {
        res.status(500).json({ message: "Failed to restore user", error: e.message });
    }
};

// ---------- MENTORS ----------

// Get all mentors (filter by status)
export const getAllMentors = async (req, res) => {
    try {
        const { status } = req.query;
        let filter = { role: "mentor" };
        if (status) filter["mentorProfile.status"] = status;

        const mentors = await User.find(filter).select("-password -refreshTokens");
        res.json(mentors);
    } catch (e) {
        res.status(500).json({ message: "Failed to fetch mentors", error: e.message });
    }
};

// Get mentor details
export const getMentorById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password -refreshTokens");
        if (!user || user.role !== "mentor") {
            return res.status(404).json({ message: "Mentor not found" });
        }
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: "Failed to fetch mentor", error: e.message });
    }
};

// Approve mentor
export const approveMentor = async (req, res) => {
    try {
        const { id } = req.params;
        const mentor = await User.findById(id);
        if (!mentor || mentor.role !== "mentor") {
            return res.status(404).json({ message: "Mentor not found" });
        }

        mentor.mentorProfile.status = "approved";
        mentor.mentorProfileHistory = null;
        await mentor.save();

        await sendMail({
            to: mentor.email,
            subject: "Mentor Profile Approved",
            html: `<p>Congratulations, ${mentor.name}! 🎉 Your mentor profile has been approved at EduBridge.</p>`
        });

        res.json({ message: "Mentor approved", mentor });

        await auditLog(req, {
            action: "mentor.approve",
            targetType: "user",
            targetId: mentor._id,
            message: `Mentor approved by admin ${req.user.email}`,
            severity: "info",
        });

    } catch (e) {
        res.status(500).json({ message: "Failed to approve mentor", error: e.message });
    }
};

// Reject mentor (with rollback + reason)
export const rejectMentor = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        const mentor = await User.findById(id);

        if (!mentor || mentor.role !== "mentor") {
            return res.status(404).json({ message: "Mentor not found" });
        }

        if (mentor.mentorProfileHistory) {
            mentor.mentorProfile = mentor.mentorProfileHistory;
            mentor.mentorProfileHistory = null;
        }

        mentor.mentorProfile.status = "rejected";
        await mentor.save();

        await sendMail({
            to: mentor.email,
            subject: "Mentor Profile Rejected",
            html: `
        <p>Dear ${mentor.name},</p>
        <p>Unfortunately, your mentor profile update was rejected.</p>
        <p><b>Reason:</b> ${reason}</p>
        <p>Your previous approved profile has been restored.</p>
      `
        });

        res.json({ message: "Mentor rejected and rolled back", mentor });

        await auditLog(req, {
            action: "mentor.reject",
            targetType: "user",
            targetId: mentor._id,
            message: `Mentor rejected by admin ${req.user.email} due to the reason: ${reason}`,
            severity: "low",
            metadata: { reason },
        });

    } catch (e) {
        res.status(500).json({ message: "Failed to reject mentor", error: e.message });
    }
};

// ---------- NOTIFICATIONS ----------

// Send email notifications (bulk or single)
export const notifyUsers = async (req, res) => {
    try {
        const { recipients, subject, message } = req.body;

        if (!recipients || recipients.length === 0) {
            return res.status(400).json({ message: "No recipients provided" });
        }

        const users = await User.find({
            $or: [
                { email: { $in: recipients } },
                { _id: { $in: recipients } }
            ]
        });

        if (!users.length) {
            return res.status(404).json({ message: "No users found" });
        }

        for (const user of users) {
            await sendMail({
                to: user.email,
                subject,
                html: `<p>Dear ${user.name},</p><p>${message}</p>`
            });
        }

        res.json({ message: `Notification sent to ${users.length} users.` });

        await auditLog(req, {
            action: "admin.notification.send",
            targetType: "email",
            targetId: `bulk:${recipients.length}`,
            message: `Admin sent notification to ${recipients.length} recipient(s)`,
            severity: "medium",
            metadata: { subject, recipientCount: recipients.length },
        });

    } catch (e) {
        res.status(500).json({ message: "Failed to send notifications", error: e.message });
    }
};

// Get all audit logs (with filters)
export const getAuditLogs = async (req, res) => {
  try {
    const { action, outcome, userId, severity, startDate, endDate } = req.query;

    let filter = {};
    if (action) filter.action = new RegExp(action, "i");
    if (outcome) filter.outcome = outcome;
    if (userId) filter.user = userId;
    if (severity) filter.severity = severity;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const logs = await AuditLog.find(filter).populate("user", "name email role");
    res.json(logs);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch audit logs", error: e.message });
  }
};

// Get audit logs for a specific user
export const getUserAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find({ user: req.params.id }).sort({ createdAt: -1 });
    res.json(logs);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch user audit logs", error: e.message });
  }
};

// Export audit logs
export const exportAuditLogs = async (req, res) => {
  try {
    const { format = "json" } = req.query; // default JSON
    const logs = await AuditLog.find().populate("user", "name email role");

    if (format === "csv") {
      const fields = ["_id", "action", "outcome", "severity", "message", "targetType", "targetId", "createdAt"];
      const parser = new Parser({ fields });
      const csv = parser.parse(logs);

      res.header("Content-Type", "text/csv");
      res.attachment("audit_logs.csv");
      return res.send(csv);
    }

    // Default JSON
    res.json(logs);

  } catch (e) {
    res.status(500).json({ message: "Failed to export logs", error: e.message });
  }
};

// ---------- ADMIN: SUSPEND USER ----------
export const suspendUser = async (req, res) => {
  try {
    const { userId, reason, otp } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 🚨 If target is ADMIN → require OTP
    if (user.role === "admin") {
      if (!otp) return res.status(400).json({ message: "OTP required to suspend admin" });

      const otpDoc = await Otp.findOne({
        email: process.env.STATIC_ADMIN_EMAIL,
        purpose: "admin_invite",
        consumed: false,
        expiresAt: { $gt: new Date() }
      }).sort({ createdAt: -1 });

      if (!otpDoc) return res.status(400).json({ message: "Invalid or expired OTP" });

      const ok = await compare(otp, otpDoc.codeHash);
      if (!ok) return res.status(400).json({ message: "Invalid OTP" });

      otpDoc.consumed = true;
      await otpDoc.save();
    }

    // ✅ Suspend indefinitely
    user.isSuspended = true;
    user.suspendedUntil = null;
    await user.save();

    // ✅ Build email body (reason optional)
    let html = `
      <p>Hello ${user.name},</p>
      <p>Your EduBridge account has been suspended by an administrator.</p>
    `;
    if (reason) {
      html += `<p><b>Reason:</b> ${reason}</p>`;
    }
    html += `<p>You cannot access your account until it is reactivated.</p>`;

    await sendMail({
      to: user.email,
      subject: "EduBridge Account Suspended",
      html
    });

    res.json({ message: "User suspended indefinitely", user });

    await auditLog(req, {
      action: "admin.suspend",
      targetType: "user",
      targetId: user._id,
      message: `User suspended indefinitely by admin ${req.user.email}`,
      severity: "high",
      metadata: { reason },
    });

  } catch (e) {
    res.status(500).json({ message: "Failed to suspend user", error: e.message });
  }
};


// ---------- ADMIN: UNSUSPEND USER ----------
export const unsuspendUser = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    if (!userId) return res.status(400).json({ message: "userId required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 🚨 Require OTP if target is admin
    if (user.role === "admin") {
      if (!otp) return res.status(400).json({ message: "OTP required to unsuspend admin" });

      const otpDoc = await Otp.findOne({
        email: process.env.STATIC_ADMIN_EMAIL,
        purpose: "admin_invite",
        consumed: false,
        expiresAt: { $gt: new Date() }
      }).sort({ createdAt: -1 });

      if (!otpDoc) return res.status(400).json({ message: "Invalid or expired OTP" });

      const ok = await compare(otp, otpDoc.codeHash);
      if (!ok) return res.status(400).json({ message: "Invalid OTP" });

      otpDoc.consumed = true;
      await otpDoc.save();
    }

    user.isSuspended = false;
    user.suspendedUntil = null;
    user.failedLoginAttempts = 0;
    await user.save();

    await sendMail({
      to: user.email,
      subject: "EduBridge Account Unsuspended",
      html: `<p>Hello ${user.name},</p><p>Your account has been reactivated by an administrator.</p>`
    });

    res.json({ message: "User unsuspended successfully", user });

    await auditLog(req, {
      action: "admin.unsuspend",
      targetType: "user",
      targetId: user._id,
      message: `User unsuspended by admin ${req.user.email}`,
      severity: "medium",
    });

  } catch (e) {
    res.status(500).json({ message: "Failed to unsuspend user", error: e.message });
  }
};