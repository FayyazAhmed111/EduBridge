import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import EmailVerification from "../models/EmailVerification.js";
import { auditLog } from "../services/auditService.js";
import { sendMail } from "../config/mailer.js";


// Helpers
const hash = async (plain) => await bcrypt.hash(plain, 10);
const compare = async (plain, hashv) => await bcrypt.compare(plain, hashv);

const makeAccessToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "15m" }
  );

const makeRefreshToken = (user) =>
  jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d" }
  );
 

// ---------- LOGIN ----------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email & password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    //  Account suspension check
    if (user.isSuspended) {
      return res.status(403).json({
        message:
          "Your account has been suspended by an administrator. Please contact support.",
      });
    }

    if (user.suspendedUntil && user.suspendedUntil > Date.now()) {
      return res.status(403).json({
        message:
          "Your account is temporarily locked due to multiple failed login attempts. Please reset your password to unlock.",
      });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      user.failedLoginAttempts += 1;

      // Suspend account after 5 failed attempts
      if (user.failedLoginAttempts >= 5) {
        user.isSuspended = true;
        user.suspendedUntil = new Date(Date.now() + 60 * 60 * 1000); // 1 hour suspension
        await user.save();

        // Send suspicious activity email
        await sendMail({
          to: user.email,
          subject: "Suspicious Login Attempts Detected",
          html: `
            <p>Hello ${user.name},</p>
            <p>We detected multiple failed login attempts on your account.</p>
            <p>Your account has been <b>temporarily suspended for 1 hour</b>.</p>
            <p>Please reset your password to unlock immediately:</p>
            <a href="${process.env.FRONTEND_URL}/forgot-password">Reset Password</a>
          `,
        });

        return res
          .status(403)
          .json({ message: "Account suspended. Reset password to unlock." });
      }

      await user.save();
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // CheCKing StatusOF MENTOR
    if (user.role === "mentor") {
      const status = user.mentorProfile?.status;
      if (status === "pending") {
        return res.status(403).json({
          message: "Your mentor account is pending approval from admin.",
        });
      }
      if (status === "rejected") {
        return res.status(403).json({
          message: "Your mentor account has been rejected by admin.",
        });
      }
    }

    // reset protection fields
    user.failedLoginAttempts = 0;
    user.isSuspended = false;
    user.suspendedUntil = null;

    const accessToken = makeAccessToken(user);
    const refreshToken = makeRefreshToken(user);

    user.refreshTokens.push(refreshToken);
    await user.save();

    res.json({ accessToken, refreshToken, user });

    //  Audit log
    await auditLog(req, {
      action: "auth.login",
      outcome: "success",
      targetType: "user",
      targetId: user._id,
      message: "User logged in",
    });
  } catch (e) {
    res.status(500).json({ message: "Login failed", error: e.message });
  }
};

// ---------- ME ----------
export const me = async (req, res) => {
  res.json({ user: req.user });
};

// ---------- STUDENT REGISTER ----------
export const registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      dob,
      password,
      level,
      institution,
      fieldOfStudy,
    } = req.body || {};
    if (!name || !email || !password || !level) {
      return res
        .status(400)
        .json({ message: "name, email, password, level are required" });
    }

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "Email already in use" });

    const user = await User.create({
      role: "student",
      name,
      email,
      phone,
      dob,
      password: await hash(password),
      isVerified: false,
      studentProfile: { level, institution, fieldOfStudy },
    });

    const token = crypto.randomBytes(32).toString("hex");
    await EmailVerification.create({
      userId: user._id,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h expiry
    });

    await sendMail({
      to: email,
      subject: "Verify your EduBridge Account",
      html: `<p>Click below to verify:</p>
             <a href="${process.env.FRONTEND_URL}/verify-email/${token}">Verify Email</a>`,
    });

    await auditLog(req, {
      action: "auth.register.student",
      outcome: "success",
      targetType: "user",
      targetId: user._id,
      message: "Student registered (verification email sent)",
    });

    return res
      .status(201)
      .json({ message: "Check your email to verify account." });
  } catch (e) {
    res.status(500).json({ message: "Registration failed", error: e.message });
  }
};

// ---------- MENTOR REGISTER ----------
export const registerMentor = async (req, res) => {
  try {
    // const { name, email, password, occupation, organization, highestEducation } = req.body || {};
    const {
      name,
      email,
      password,
      phone,
      dob,
      gender,
      occupation,
      organization,
      highestEducation,
      yearsOfExperience,
      expertise,
      whyMentor,
      mentorAreas,
      availability,
      format,
      languages,
      linkedin,
      resumeUrl,
      references,
      idDocumentUrl,
      termsAccepted,
    } = req.body || {};

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email, password are required" });
    }

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "Email already in use" });

    const user = await User.create({
      // role: "mentor",
      // name,
      // email,
      // password: await hash(password),
      // isVerified: false,
      // // mentorProfile: { occupation, organization, highestEducation, status: "pending" }
      // mentorProfile: {
      //   occupation,
      //   organization,
      //   highestEducation,
      //   yearsOfExperience,
      //   expertise: Array.isArray(expertise) ? expertise : [],
      //   mentorAreas: Array.isArray(mentorAreas) ? mentorAreas : [],
      //   whyMentor,
      //   availability,
      //   format,
      //   languages: Array.isArray(languages) ? languages : [],
      //   linkedin,
      //   status: "pending",
      role: "mentor",
      name,
      email,
      phone,
      dob,
      gender,
      password: await hash(password),
      isVerified: false,
      mentorProfile: {
        occupation,
        organization,
        highestEducation,
        yearsOfExperience,
        expertise: Array.isArray(expertise) ? expertise : [expertise],
        whyMentor,
        mentorAreas: Array.isArray(mentorAreas) ? mentorAreas : [mentorAreas],
        availability,
        format,
        languages: Array.isArray(languages) ? languages : [languages],
        linkedin,
        resumeUrl,
        references,
        idDocumentUrl,
        termsAccepted,
        status: "pending",
      },
    });

    const token = crypto.randomBytes(32).toString("hex");
    await EmailVerification.create({
      userId: user._id,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h expiry
    });

    await sendMail({
      to: email,
      subject: "Verify your EduBridge Mentor Account",
      html: `<p>Click below to verify your mentor account:</p>
             <a href="${process.env.FRONTEND_URL}/verify-email/${token}">Verify Email</a>`,
    });

    await auditLog(req, {
      action: "auth.register.mentor",
      outcome: "success",
      targetType: "user",
      targetId: user._id,
      message: "Mentor registered (verification email sent)",
    });

    return res
      .status(201)
      .json({ message: "Check your email to verify mentor account." });
  } catch (e) {
    res.status(500).json({ message: "Registration failed", error: e.message });
  }
};


// ---------- ADMIN OTP ----------
export const sendAdminInviteOtp = async (req, res) => {
  try {
    const to = process.env.STATIC_ADMIN_EMAIL;

    // rate limit blocking aftr 30s
    const recentOtp = await Otp.findOne({
      email: to,
      purpose: "admin_invite",
      createdAt: { $gt: new Date(Date.now() - 30 * 1000) }
    }).sort({ createdAt: -1 });

    if (recentOtp) {
      return res.status(429).json({ message: "Please wait 30 seconds before requesting another OTP." });
    }

    // Generate OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeHash = await hash(code);
    const expiresAt = new Date(Date.now() + 30 * 1000);

    await Otp.create({ email: to, purpose: "admin_invite", codeHash, expiresAt });


    await sendMail({
      to,
      subject: "EduBridge Admin OTP Code",
      template: "adminOtp",
      context: {
        code,
        resetLink: `${process.env.FRONTEND_URL}/forgot-password`
      }
    });

    res.json({ message: "OTP sent (valid for 30 seconds)." });
  } catch (e) {
    res.status(500).json({ message: "Failed to send OTP", error: e.message });
  }
};

// ---------- ADMIN REGISTER ----------
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, secretCode } = req.body || {};
    if (!name || !email || !password || !secretCode) {
      return res.status(400).json({ message: "name, email, password, secretCode required" });
    }

    const otpDoc = await Otp.findOne({
      email: process.env.STATIC_ADMIN_EMAIL,
      purpose: "admin_invite",
      consumed: false,
      expiresAt: { $gt: new Date() }
    }).sort({ createdAt: -1 });

    if (!otpDoc) return res.status(400).json({ message: "OTP expired or invalid" });

    const ok = await compare(secretCode, otpDoc.codeHash);
    if (!ok) return res.status(400).json({ message: "Invalid OTP" });

    otpDoc.consumed = true;
    await otpDoc.save();

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already in use" });

    const user = await User.create({
      role: "admin",
      name,
      email,
      password: await hash(password),
      isVerified: true
    });

    const token = makeAccessToken(user);
    res.status(201).json({ token, user });

    await auditLog(req, {
      action: "auth.register.admin",
      targetType: "user",
      targetId: user._id,
      message: "Admin registered ",
    });

  } catch (e) {
    res.status(500).json({ message: "Admin creation failed", error: e.message });
  }
};

// ---------- VERIFY EMAIL ----------
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const record = await EmailVerification.findOne({ token });
    if (!record || record.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired link" });
    }

    const user = await User.findById(record.userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    user.isVerified = true;
    await user.save();
    await EmailVerification.deleteMany({ userId: user._id });

    res.json({ message: "Email verified successfully." });
    await auditLog(req, {
      action: "auth.verifyEmail",
      targetType: "user",
      targetId: user._id,
      message: "Email verified",
    });

  } catch (e) {
    res.status(500).json({ message: "Verification failed", error: e.message });
  }


};

// ---------- RESEND EMAIL VERIFICATION ----------
export const resendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "Email already verified" });

    await EmailVerification.deleteMany({ userId: user._id });

    const token = crypto.randomBytes(32).toString("hex");
    await EmailVerification.create({
      userId: user._id,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    await sendMail({
      to: email,
      subject: "Resend - Verify your EduBridge Account",
      html: `<p>Click below to verify your account:</p>
             <a href="${process.env.FRONTEND_URL}/verify-email/${token}">Verify Email</a>`
    });

    res.json({ message: "Verification email resent." });



  } catch (e) {
    res.status(500).json({ message: "Failed to resend verification", error: e.message });
  }
};

// ---------- FORGOT PASSWORD ----------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No account with this email" });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    await sendMail({
      to: user.email,
      subject: "EduBridge Password Reset",
      html: `<p>Click below to reset (valid 15min):</p>
             <a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">Reset Password</a>`
    });

    res.json({ message: "Reset link sent to email" });

    await auditLog(req, {
      action: "auth.forgotPassword",
      targetType: "user",
      targetId: user._id,
      message: "Password reset link sent",
    });

  } catch (e) {
    res.status(500).json({ message: "Failed to send reset link", error: e.message });
  }
};

// ---------- RESET PASSWORD ----------
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await hash(newPassword);

    // Reset suspension after password reset
    user.failedLoginAttempts = 0;
    user.isSuspended = false;
    user.suspendedUntil = null;

    await user.save();

    res.json({ message: "Password updated & account unlocked" });

    await auditLog(req, {
      action: "auth.resetPassword",
      targetType: "user",
      targetId: user._id,
      message: "Password reset completed & account unlocked",
      severity: "medium",
    });

  } catch (e) {
    res.status(500).json({ message: "Failed to reset password", error: e.message });
  }
};


// ---------- CHANGE PASSWORD ----------
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const ok = await compare(oldPassword, user.password);
    if (!ok) return res.status(400).json({ message: "Old password incorrect" });

    user.password = await hash(newPassword);
    await user.save();

    res.json({ message: "Password changed successfully" });

    await auditLog(req, {
      action: "auth.changepassword",
      targetType: "user",
      targetId: user._id,
      message: "Password reset completed",
      severity: "medium",
    });

  } catch (e) {
    res.status(500).json({ message: "Failed to change password", error: e.message });
  }
};

// // ---------- APPROVE MENTOR ----------
// export const approveMentor = async (req, res) => {
//   try {
//     const { mentorId } = req.params;
//     const user = await User.findById(mentorId);
//     if (!user || user.role !== "mentor") {
//       return res.status(404).json({ message: "Mentor not found" });
//     }

//     user.mentorProfile.status = "approved";
//     user.mentorProfileHistory = null; 
//     await user.save();

//     await sendMail({
//       to: user.email,
//       subject: "Mentor Profile Approved",
//       html: `<p>Congratulations! 🎉 Your mentor profile has been approved at EduBridge.</p>`
//     });

//     res.json({ message: "Mentor approved successfully", user });
//   } catch (e) {
//     res.status(500).json({ message: "Failed to approve mentor", error: e.message });
//   }
// };


// // ---------- REJECT MENTOR ----------
// export const rejectMentor = async (req, res) => {
//   try {
//     const { mentorId } = req.params;
//     const { reason } = req.body; // admin types reason
//     const user = await User.findById(mentorId);
//     if (!user || user.role !== "mentor") {
//       return res.status(404).json({ message: "Mentor not found" });
//     }


//     if (user.mentorProfileHistory) {
//       user.mentorProfile = user.mentorProfileHistory;
//       user.mentorProfileHistory = null;
//     }

//     user.mentorProfile.status = "rejected";
//     await user.save();

//     await sendMail({
//       to: user.email,
//       subject: "Mentor Profile Rejected",
//       html: `
//         <p>Unfortunately, your mentor profile update was rejected.</p>
//         <p><b>Reason:</b> ${reason}</p>
//         <p>Your previous approved profile has been restored. You may try updating again later.</p>
//       `
//     });

//     res.json({ message: "Mentor profile rejected and rolled back", user });
//   } catch (e) {
//     res.status(500).json({ message: "Failed to reject mentor", error: e.message });
//   }
// };



// ---------- UPDATE PROFILE (Student / Mentor) ----------
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "admin") {
      return res.status(403).json({ message: "Admins cannot update profile via this endpoint" });
    }

    const { name, phone, dob, gender, profilePhoto, studentProfile, mentorProfile } = req.body;

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (dob) user.dob = dob;
    if (gender) user.gender = gender;
    if (profilePhoto) user.profilePhoto = profilePhoto;

    if (user.role === "student" && studentProfile) {
      user.studentProfile = {
        ...(user.studentProfile?.toObject?.() || {}),
        ...studentProfile,
      };
    }

    if (user.role === "mentor" && mentorProfile) {
      const sensitiveFields = [
        "occupation",
        "organization",
        "highestEducation",
        "expertise",
        "mentorAreas",
        "yearsOfExperience"
      ];

      let requiresReview = false;
      sensitiveFields.forEach((field) => {
        if (mentorProfile[field] && mentorProfile[field] !== user.mentorProfile?.[field]) {
          requiresReview = true;
        }
      });

      if (requiresReview && user.mentorProfile) {
        user.mentorProfileHistory = user.mentorProfile.toObject();
      }

      user.mentorProfile = {
        ...(user.mentorProfile?.toObject?.() || {}),
        ...mentorProfile,
      };

      if (requiresReview) {
        user.mentorProfile.status = "pending";
      }
    }

    await user.save();
    res.json({ message: "Profile updated successfully", user });

    await auditLog(req, {
      action: "profile.update",
      targetType: "user",
      targetId: user._id,
      message: "Profile updated",
      metadata: { role: user.role },
    });

  } catch (e) {
    res.status(500).json({ message: "Failed to update profile", error: e.message });
  }
};

// ---------- DELETE ACCOUNT ----------
export const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "admin") {
      return res.status(403).json({ message: "Admins cannot delete their account directly" });
    }

    // SOFT DELETE
    user.isDeleted = true;
    user.deletedAt = new Date();
    await user.save();

    // Send email confirmation
    await sendMail({
      to: user.email,
      subject: "EduBridge Account Deleted",
      template: "accountDeleted",
      context: { name: user.name }
    });

    res.json({ message: "Account deleted successfully" });

    await auditLog(req, {
      action: "account.delete",
      targetType: "user",
      targetId: user._id,
      message: "User account deleted (soft)",
      severity: "medium",
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to delete account", error: e.message });
  }
};

// ---------- LOGOUT ----------
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });

    // Remove refresh token from user's record
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.refreshTokens = user.refreshTokens.filter(token => token !== refreshToken);
    await user.save();

    res.json({ message: "Logged out successfully" });
    await auditLog(req, {
      action: "auth.logout",
      targetType: "user",
      targetId: user._id,
      message: "User logged out",
    });
  } catch (e) {
    res.status(500).json({ message: "Logout failed", error: e.message });
  }
};

// ---------- REFRESH TOKEN ----------
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: "Refresh token required" });

    const user = await User.findOne({ refreshTokens: refreshToken });
    if (!user) return res.status(403).json({ message: "Invalid refresh token" });

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Expired or invalid refresh token" });

      const newAccessToken = jwt.sign(
        { id: decoded.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken: newAccessToken });

      auditLog(req, {
        action: "auth.refreshToken",
        targetType: "user",
        targetId: user._id,
        message: "Access token refreshed",
      });
    });
  } catch (e) {
    res.status(500).json({ message: "Failed to refresh token", error: e.message });
  }
};

