import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import { sendMail } from "../config/mailer.js";

// helpers
const makeToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || "7d" });

const hash = async (plain) => await bcrypt.hash(plain, 10);
const compare = async (plain, hashv) => await bcrypt.compare(plain, hashv);

// ---------- LOGIN ----------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: "Email & password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = makeToken(user);
    res.json({ token, user });
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
      name, email, phone, dob, password, profilePhoto,
      level, institution, fieldOfStudy, gpa, studentIdUrl, termsAccepted
    } = req.body || {};

    if (!name || !email || !password || !level) {
      return res.status(400).json({ message: "name, email, password, level are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already in use" });

    const user = await User.create({
      role: "student",
      name,
      email,
      phone,
      dob,
      password: await hash(password),
      profilePhoto,
      studentProfile: {
        level,
        institution,
        fieldOfStudy,
        gpa,
        studentIdUrl,
        termsAccepted: !!termsAccepted
      }
    });

    const token = makeToken(user);
    res.status(201).json({ token, user });
  } catch (e) {
    res.status(500).json({ message: "Registration failed", error: e.message });
  }
};

// ---------- MENTOR REGISTER ----------
export const registerMentor = async (req, res) => {
  try {
    const {
      name, email, phone, dob, gender, password, profilePhoto,
      occupation, organization, highestEducation, expertise = [],
      yearsOfExperience, whyMentor, mentorAreas = [],
      menteeLevel, availability, format, languages = [],
      linkedin, resumeUrl, references, idDocumentUrl, termsAccepted
    } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email, password are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already in use" });

    const user = await User.create({
      role: "mentor",
      name,
      email,
      phone,
      dob,
      gender,
      password: await hash(password),
      profilePhoto,
      mentorProfile: {
        occupation,
        organization,
        highestEducation,
        expertise,
        yearsOfExperience,
        whyMentor,
        mentorAreas,
        menteeLevel,
        availability,
        format,
        languages,
        linkedin,
        resumeUrl,
        references,
        idDocumentUrl,
        termsAccepted: !!termsAccepted,
        status: "pending" // can be changed by admin later
      }
    });

    const token = makeToken(user);
    res.status(201).json({ token, user });
  } catch (e) {
    res.status(500).json({ message: "Registration failed", error: e.message });
  }
};

// ---------- ADMIN OTP (must be admin) ----------
export const sendAdminInviteOtp = async (req, res) => {
  try {
    const to = process.env.STATIC_ADMIN_EMAIL;
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const codeHash = await hash(code);

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    await Otp.create({ email: to, purpose: "admin_invite", codeHash, expiresAt });

    await sendMail({
      to,
      subject: "EduBridge Admin Invite Code",
      html: `
        <p>Use the following 6-digit code to create a new Admin:</p>
        <h2 style="font-size:24px;letter-spacing:4px">${code}</h2>
        <p>This code expires in 10 minutes.</p>
      `,
    });

    res.json({ message: "OTP sent to static admin email." });
  } catch (e) {
    res.status(500).json({ message: "Failed to send OTP", error: e.message });
  }
};

// ---------- ADMIN REGISTER (must be admin + valid OTP) ----------
export const registerAdmin = async (req, res) => {
  try {
    const {
      name, email, phone, password, profilePhoto,
      secretCode // the 6-digit code sent to STATIC_ADMIN_EMAIL
    } = req.body || {};

    if (!name || !email || !password || !secretCode) {
      return res.status(400).json({ message: "name, email, password, secretCode are required" });
    }

    // verify OTP
    const to = process.env.STATIC_ADMIN_EMAIL;
    const otpDoc = await Otp.findOne({
      email: to,
      purpose: "admin_invite",
      consumed: false,
      expiresAt: { $gt: new Date() }
    }).sort({ createdAt: -1 });

    if (!otpDoc) return res.status(400).json({ message: "No valid OTP found" });

    const ok = await compare(secretCode, otpDoc.codeHash);
    if (!ok) return res.status(400).json({ message: "Invalid OTP code" });

    // consume otp
    otpDoc.consumed = true;
    await otpDoc.save();

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already in use" });

    const user = await User.create({
      role: "admin",
      name,
      email,
      phone,
      password: await hash(password),
      profilePhoto
    });

    const token = makeToken(user);
    res.status(201).json({ token, user });
  } catch (e) {
    res.status(500).json({ message: "Admin creation failed", error: e.message });
  }
};
