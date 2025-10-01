import Testimonial from "../models/Testimonial.js";
import { auditLog } from "../services/auditService.js";

// Add testimonial (by user)
export const addTestimonial = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: "Message required" });

    const testimonial = await Testimonial.create({
      userId: req.user._id,
      message,
      status: "pending",
    });

    res.status(201).json({ message: "Testimonial submitted (pending approval)", testimonial });

    await auditLog(req, {
      action: "testimonial.add",
      targetType: "testimonial",
      targetId: testimonial._id,
      message: "User submitted testimonial",
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to add testimonial", error: e.message });
  }
};

// Get all testimonials (admin can see all, users only see approved)
export const getTestimonials = async (req, res) => {
  try {
    let filter = { status: "approved" };
    if (req.user.role === "admin") filter = {}; // admin sees all

    const testimonials = await Testimonial.find(filter).populate("userId", "name email role");
    res.json(testimonials);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch testimonials", error: e.message });
  }
};

// Approve testimonial
export const approveTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "Not found" });

    testimonial.status = "approved";
    testimonial.adminResponse = null;
    await testimonial.save();

    res.json({ message: "Testimonial approved", testimonial });

    await auditLog(req, {
      action: "testimonial.approve",
      targetType: "testimonial",
      targetId: testimonial._id,
      message: "Admin approved testimonial",
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to approve testimonial", error: e.message });
  }
};

// Reject testimonial
export const rejectTestimonial = async (req, res) => {
  try {
    const { reason } = req.body;
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "Not found" });

    testimonial.status = "rejected";
    testimonial.adminResponse = reason || "No reason provided";
    await testimonial.save();

    res.json({ message: "Testimonial rejected", testimonial });

    await auditLog(req, {
      action: "testimonial.reject",
      targetType: "testimonial",
      targetId: testimonial._id,
      message: `Admin rejected testimonial - Reason: ${reason}`,
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to reject testimonial", error: e.message });
  }
};
