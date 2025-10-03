// backend/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const requireAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

    if (!token) return res.status(401).json({ message: "Unauthorized: Token missing" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);

    if (!user) return res.status(401).json({ message: "User not found" });

    // Block soft-deleted
    if (user.isDeleted) {
      return res.status(403).json({ message: "Account is deleted" });
    }

    // Block suspended
    if (user.isSuspended && user.suspendedUntil && user.suspendedUntil > new Date()) {
      return res.status(403).json({
        message: "Your account is suspended. Please contact support."
      });
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ Role-based guard
export const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
};

export const requireAdmin = (req, res, next) =>
  requireRole("admin")(req, res, next);
