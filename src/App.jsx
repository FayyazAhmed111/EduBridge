import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔹 Normal Pages
import Dashboard from "./Pages/Dashboard";
import SuccessStoriesPage from "./Pages/SuccessStories";
import QAPage from "./Pages/QAPage";
import LandingPage from "./Pages/LandingPage";
import ScholarshipPage from "./Pages/Scholarships";
import AboutPage from "./Pages/About";
import ForgetPassword from "./Pages/ForgetPassword";
import ContactPage from "./Pages/Contact";
import CoursesPage from "./Pages/Course";
import Profile from "./Pages/Profile";
import VerifyEmail from "./Pages/VerifyEmail";
import ResetPassword from "./Pages/ResetPassword";

// 🔹 Admin Pages
import AdminLogin from "../src/admin/pages/adminLogin.jsx";
import AdminDashboard from "../src/admin/pages/adminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stories" element={<SuccessStoriesPage />} />
        <Route path="/qa" element={<QAPage />} />
        <Route path="/scholarships" element={<ScholarshipPage />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/profile" element={<Profile />} />

        {/* ---------- AUTHENTICATION ROUTES ---------- */}
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ---------- ADMIN ROUTES ---------- */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
