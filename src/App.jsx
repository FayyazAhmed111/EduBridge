import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// normal pages
import Dashboard from "./Pages/Dashboard";
import SuccessStoriesPage from "./Pages/SuccessStories";
import QAPage from "./Pages/QAPage";
import LandingPage from "./Pages/LandingPage";
import ScholorshipPage from "./Pages/Scholarships";
import AboutPage from "./Pages/About";
import ForgetPassword from "./Pages/ForgetPassword";
import ContactPage from "./Pages/Contact";
import CoursesPage from "./Pages/Course";

// admin panel
import Sidebar from "../src/admin/components/Sidebar";
import Navbar from "../src/admin/components/Navbar";
import Darkmode from "../src/admin/components/darkmode";

import Login from "../src/admin/pages/Login";
import AdminDashboard from "../src/admin/pages/Dashboard";
import Mentors from "../src/admin/pages/Mentors";
import Students from "../src/admin/pages/StudentManagement";
import Scholarships from "../src/admin/pages/Scholarships";
import Testimonials from "../src/admin/pages/Testimonial";
import Settings from "../src/admin/pages/Settings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        {/* noram page routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stories" element={<SuccessStoriesPage />} />
        <Route path="/qa" element={<QAPage />} />
        <Route path="/scholarships" element={<ScholorshipPage />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/courses" element={<CoursesPage />} />

        {/* admin routes */}
        <Route
          path="/admin/*"
          element={
            isLoggedIn ? (
              <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar setIsLoggedIn={setIsLoggedIn} />
                  <div className="p-6 flex-1">
                    <Routes>
                      <Route path="" element={<AdminDashboard />} />
                      <Route path="mentors" element={<Mentors />} />
                      <Route path="students" element={<Students />} />
                      <Route path="scholarships" element={<Scholarships />} />
                      <Route path="testimonials" element={<Testimonials />} />
                      <Route
                        path="settings"
                        element={<Settings setTheme={setTheme} theme={theme} />}
                      />
                      <Route path="*" element={<Navigate to="/admin" />} />
                    </Routes>
                  </div>
                </div>
                <Darkmode theme={theme} setTheme={setTheme} />
              </div>
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
