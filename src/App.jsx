import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import SuccessStoriesPage from "./Pages/SuccessStories";
import QAPage from "./Pages/QAPage";
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import LandingPage from "./Pages/LandingPage"
import ScholorshipPage from "./Pages/Scholarships"
import AboutPage from "./Pages/About";
import ForgetPassword from "./Pages/ForgetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element= {<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stories" element={<SuccessStoriesPage />} />
        <Route path="/qa" element={<QAPage />} />
        <Route path="/scholarships" element={<ScholorshipPage />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
