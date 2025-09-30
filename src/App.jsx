import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import SuccessStoriesPage from "./Pages/SuccessStories";
import QAPage from "./Pages/QAPage";
import LandingPage from "./Pages/LandingPage"
import ScholorshipPage from "./Pages/Scholarships"
import AboutPage from "./Pages/About";
import ForgetPassword from "./Pages/ForgetPassword";
import ContactPage from "./Pages/Contact";
import CoursesPage from "./Pages/Course";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stories" element={<SuccessStoriesPage />} />
        <Route path="/qa" element={<QAPage />} />
        <Route path="/scholarships" element={<ScholorshipPage />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
