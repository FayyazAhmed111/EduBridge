import mongoose from "mongoose";

// Mentor profile
const MentorProfileSchema = new mongoose.Schema({
  occupation: String,
  organization: String,
  highestEducation: String,
  expertise: [String],
  yearsOfExperience: Number,
  whyMentor: String,
  mentorAreas: [String],
  menteeLevel: {
    type: String,
    enum: ["High School", "College", "Postgraduate", "Early Career"],
    default: "College"
  },
  availability: String,
  format: {
    type: String,
    enum: ["Online", "In-person", "Both"],
    default: "Online"
  },
  languages: [String],
  linkedin: String,
  resumeUrl: String,
  references: String,
  idDocumentUrl: String,
  termsAccepted: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
}, { _id: false });

// Student profile
const StudentProfileSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ["High School", "College", "University"],
    required: true
  },
  institution: String,
  fieldOfStudy: String,
  gpa: String,
  studentIdUrl: String,
  termsAccepted: { type: Boolean, default: false },

  // NEW fields
  educationHistory: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startYear: Number,
      endYear: Number,
      gpa: String
    }
  ],
  interests: [String], // e.g. ["AI", "Healthcare", "Economics"]
  preferredStudyDestinations: [String], // e.g. ["USA", "UK", "Germany"]
  careerGoals: String // Free text: "I want to become a data scientist"
}, { _id: false });

// Main User schema
const UserSchema = new mongoose.Schema({
  role: { type: String, enum: ["admin", "mentor", "student"], required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, index: true, required: true },
  phone: String,
  dob: Date,
  gender: String,
  password: { type: String, required: true },
  profilePhoto: String,

  // Auth / control flags
  refreshTokens: [{ type: String }],
  isVerified: { type: Boolean, default: false },

  failedLoginAttempts: { type: Number, default: 0 },
  isSuspended: { type: Boolean, default: false },
  suspendedUntil: { type: Date, default: null },

  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },

  // Profiles
  mentorProfile: MentorProfileSchema,
  mentorProfileHistory: MentorProfileSchema,
  studentProfile: StudentProfileSchema
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
