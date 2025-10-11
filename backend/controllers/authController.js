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

    // 🧱 Check for permanent or temporary suspension
    if (user.isSuspended) {
      return res.status(403).json({
        message:
          "Your account has been suspended by the administrator. Please contact support.",
      });
    }

    if (user.suspendedUntil && user.suspendedUntil > new Date()) {
      return res.status(403).json({
        message:
          "Your account is temporarily locked. Please reset your password or wait until suspension expires.",
      });
    }

    // 🧩 Verify password
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      user.failedLoginAttempts += 1;

      if (user.failedLoginAttempts >= 5) {
        user.isSuspended = true;
        user.suspendedUntil = new Date(Date.now() + 60 * 60 * 1000); // 1 hour lock
        await user.save();

        await sendMail({
          to: user.email,
          subject: "Suspicious Login Attempts Detected",
          html: `
            <p>Hello ${user.name},</p>
            <p>We detected multiple failed login attempts on your account.</p>
            <p>Your account has been temporarily suspended for 1 hour.</p>
            <p>You can unlock it by resetting your password:</p>
            <a href="${process.env.FRONTEND_URL}/forgot-password">Reset Password</a>
          `,
        });

        return res.status(403).json({ message: "Account suspended due to failed login attempts. Reset password to unlock." });
      }

      await user.save();
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🚫 Prevent login if email not verified
   if (!user.isVerified && user.role !== "admin") {
  return res.status(403).json({
    message: "Please verify your email before logging in.",
    resendLink: `${process.env.FRONTEND_URL}/resend-verification?email=${encodeURIComponent(user.email)}`
  });
}
    if (user.isDeleted) {
      return res.status(403).json({ message: "This account has been deleted." });
    }

    // 🧠 Mentor status check
    if (user.role === "mentor") {
      const status = user.mentorProfile?.status;
      if (status === "pending") {
        return res.status(403).json({ message: "Your mentor account is pending admin approval." });
      }
      if (status === "rejected") {
        return res.status(403).json({ message: "Your mentor account was rejected by admin." });
      }
    }

    // ✅ Reset failed attempts
    user.failedLoginAttempts = 0;
    user.isSuspended = false;
    user.suspendedUntil = null;

    const accessToken = makeAccessToken(user);
    const refreshToken = makeRefreshToken(user);

    user.refreshTokens.push(refreshToken);
    await user.save();

    await auditLog(req, {
      action: "auth.login",
      outcome: "success",
      targetType: "user",
      targetId: user._id,
      message: "User logged in successfully",
    });

    res.json({ accessToken, refreshToken, user });
  } catch (e) {
    console.error("Login error:", e);
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
      gender,
      password,
      level,
      institution,
      fieldOfStudy,
      gpa,
      studentIdUrl,
      educationHistory = [],
      interests = [],
      preferredStudyDestinations = [],
      careerGoals,
      termsAccepted
    } = req.body || {};

    if (!name || !email || !password || !level)
      return res.status(400).json({ message: "name, email, password, and level are required" });
    if (!termsAccepted)
      return res.status(400).json({ message: "You must accept the terms and conditions" });

    // ✅ Duplicate check for email or phone
    const existing = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (existing)
      return res.status(409).json({ message: "An account with this email or phone number already exists" });

    const user = await User.create({
      role: "student",
      name,
      email,
      phone,
      dob,
      gender,
      password: await hash(password),
      isVerified: false,
      studentProfile: {
        level,
        institution,
        fieldOfStudy,
        gpa,
        studentIdUrl,
        termsAccepted: !!termsAccepted,
        educationHistory: Array.isArray(educationHistory) ? educationHistory : [],
        interests: Array.isArray(interests) ? interests : [interests],
        preferredStudyDestinations: Array.isArray(preferredStudyDestinations)
          ? preferredStudyDestinations
          : [preferredStudyDestinations],
        careerGoals
      }
    });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    await EmailVerification.create({ userId: user._id, token, expiresAt });

    await sendMail({
      to: email,
      subject: "Verify your EduBridge Account",
      html: `
        <p>Welcome to EduBridge!</p>
        <p>Please verify your email:</p>
        <a href="${process.env.FRONTEND_URL}/verify-email/${token}">Verify Email</a>
        <br/><p>This link will expire in 24 hours.</p>
      `
    });

    await auditLog(req, {
      action: "auth.register.student",
      outcome: "success",
      targetType: "user",
      targetId: user._id,
      message: "Student registration initiated with verification email.",
    });

    return res.status(201).json({ message: "Registration successful. Check your email for verification." });
  } catch (e) {
    console.error("Student registration error:", e);
    res.status(500).json({ message: "Registration failed", error: e.message });
  }
};



// ---------- MENTOR REGISTER ----------
export const registerMentor = async (req, res) => {
  try {
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
      termsAccepted
    } = req.body || {};

    if (!name || !email || !password)
      return res.status(400).json({ message: "name, email, password are required" });
    if (!termsAccepted)
      return res.status(400).json({ message: "You must accept the terms and conditions" });

    // ✅ Duplicate check for email or phone
    const existing = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (existing)
      return res.status(409).json({ message: "An account with this email or phone number already exists" });

    const user = await User.create({
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
        termsAccepted: !!termsAccepted,
        status: "pending"
      }
    });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    await EmailVerification.create({ userId: user._id, token, expiresAt });

    await sendMail({
      to: email,
      subject: "Verify your EduBridge Mentor Account",
      html: `
        <p>Welcome to EduBridge, ${name}!</p>
        <p>Please click below to verify your mentor account:</p>
        <a href="${process.env.FRONTEND_URL}/verify-email/${token}">Verify Email</a>
        <br/><p>This link will expire in 24 hours.</p>
      `
    });

    await auditLog(req, {
      action: "auth.register.mentor",
      outcome: "success",
      targetType: "user",
      targetId: user._id,
      message: "Mentor registration initiated with verification email.",
    });

    return res.status(201).json({ message: "Mentor registered successfully. Please verify your email." });
  } catch (e) {
    console.error("Mentor registration error:", e);
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
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ message: "Missing verification token" });
    }

    const record = await EmailVerification.findOne({ token });
    if (!record) {
      // Check if already verified
      const alreadyVerified = await User.findOne({ isVerified: true, "emailVerificationToken": token });
      if (alreadyVerified) {
        return res.status(200).json({ message: "Email already verified." });
      }
      return res.status(400).json({ message: "Invalid or expired verification link." });
    }

    if (record.expiresAt < new Date()) {
      await EmailVerification.deleteOne({ _id: record._id });
      return res.status(400).json({ message: "Verification link expired." });
    }

    const user = await User.findById(record.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.isVerified) {
      await EmailVerification.deleteOne({ _id: record._id });
      return res.status(200).json({ message: "Email already verified." });
    }

    user.isVerified = true;
    await user.save();
    await EmailVerification.deleteOne({ _id: record._id });

    // ✅ Return JSON only — no redirects
    return res.status(200).json({ message: "Email verified successfully!" });

    // 9️⃣ Async audit log (no impact on response time)
    auditLog(req, {
      action: "auth.verifyEmail",
      targetType: "user",
      targetId: user._id,
      message: "User verified email successfully.",
    }).catch(console.error);

    

  } catch (error) {
    console.error("Verify email error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// ---------- RESEND EMAIL VERIFICATION ----------
export const resendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;

    // 1️⃣ Validate input
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No account found with this email." });
    }

    // 3️⃣ Check if already verified
    if (user.isVerified) {
      // Clean up any stray tokens
      await EmailVerification.deleteMany({ userId: user._id });
      return res.status(200).json({
        message: "This email is already verified. You can log in now.",
      });
    }

    // 4️⃣ Clean up old pending tokens
    await EmailVerification.deleteMany({ userId: user._id });

    // 5️⃣ Create new secure token (24h validity)
    const token = crypto.randomBytes(32).toString("hex");
    await EmailVerification.create({
      userId: user._id,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    // 6️⃣ Build frontend verification link
    const verifyLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;

    // 7️⃣ Send verification email
    await sendMail({
      to: email,
      subject: "Verify Your EduBridge Account",
      html: `
        <p>Hello ${user.name || "User"},</p>
        <p>Please verify your email to activate your account:</p>
        <a href="${verifyLink}"
           style="
             background:#4f46e5;
             color:#fff;
             padding:10px 20px;
             text-decoration:none;
             border-radius:6px;
             display:inline-block;
           ">
           Verify Email
        </a>
        <p>This link will expire in 24 hours.</p>
        <br/>
        <p>If you did not create this account, you can ignore this email.</p>
      `,
    });

    // 8️⃣ Respond immediately (fast UX, no redirect)
    res.status(200).json({
      message: "✅ Verification email has been resent. Please check your inbox.",
      link: verifyLink,
    });

    // 9️⃣ Async audit log (no impact on response time)
    auditLog(req, {
      action: "auth.resendVerification",
      targetType: "user",
      targetId: user._id,
      outcome: "success",
      message: "Resent verification email",
    }).catch(console.error);

  } catch (error) {
    console.error("❌ Resend verification error:", error);
    res.status(500).json({
      message: "Failed to resend verification email. Please try again later.",
      error: error.message,
    });
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

