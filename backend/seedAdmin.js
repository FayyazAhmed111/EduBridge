import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import connectDB from "./config/db.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = "admin@example.com";
    const password = "Admin@123"; 
    const hashed = await bcrypt.hash(password, 10);

    const exists = await User.findOne({ email });
    if (exists) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    const admin = await User.create({
      role: "admin",
      name: "Super Admin",
      email,
      password: hashed,
      isVerified: true
    });

    console.log("✅ Admin created:", admin.email);
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding admin:", err);
    process.exit(1);
  }
};

seedAdmin();
