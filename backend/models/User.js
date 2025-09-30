import mongoose from "mongoose";

const MentorProfileSchema = new mongoose.Schema({
  occupation: String,
  organization: String,
  highestEducation: String,
  expertise: [String],           // e.g. ["STEM","Business"]
  yearsOfExperience: Number,
  whyMentor: String,             // paragraph
  mentorAreas: [String],         // e.g. ["Career Guidance", "Soft Skills"]
  menteeLevel: { type: String, enum: ["High School", "College", "Postgraduate", "Early Career"], default: "College" },
  availability: String,          // "5 hrs/week, Sat-Sun"
  format: { type: String, enum: ["Online", "In-person", "Both"], default: "Online" },
  languages: [String],
  linkedin: String,
  resumeUrl: String,             // optional file URL
  references: String,            // optional
  idDocumentUrl: String,         // optional
  termsAccepted: { type: Boolean, default: false },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" } // optional moderation
}, { _id: false });

const StudentProfileSchema = new mongoose.Schema({
  level: { type: String, enum: ["High School", "College", "University"], required: true },
  institution: String,
  fieldOfStudy: String,
  gpa: String,                   // optional
  studentIdUrl: String,          // optional file URL
  termsAccepted: { type: Boolean, default: false }
}, { _id: false });

const UserSchema = new mongoose.Schema({
  role: { type: String, enum: ["admin", "mentor", "student"], required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, index: true, required: true },
  phone: String,
  dob: Date,
  gender: String,
  password: { type: String, required: true },
  profilePhoto: String, // URL optional
  mentorProfile: MentorProfileSchema,
  studentProfile: StudentProfileSchema
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
