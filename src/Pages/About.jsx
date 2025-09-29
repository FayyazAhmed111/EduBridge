// src/Pages/AboutPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ✅ Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
          About Edu Bridge
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-blue-100">
          Empowering students to unlock global opportunities through scholarships, mentorship, and guidance.
        </p>
      </section>

      {/* Content Section */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div className="bg-white shadow-md rounded-2xl p-6 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            <strong>Edu Bridge</strong> is a student-focused platform designed to
            help university students access scholarships, connect with mentors,
            and learn from successful seniors who have achieved international
            education opportunities.
            <br />
            <br />
            Our goal is to create a <strong>bridge</strong> between aspiring
            students and the global academic world — making information about
            funding, guidance, and study opportunities easily available.
            <br />
            <br />
            Whether you’re preparing for scholarships, looking for mentorship, or
            simply exploring options abroad, Edu Bridge aims to simplify your
            journey.
          </p>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Scholarships</h3>
            <p className="text-gray-600 text-sm">
              Access curated funding opportunities for international education.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Mentorship</h3>
            <p className="text-gray-600 text-sm">
              Connect with seniors and mentors who’ve walked the same path.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Community</h3>
            <p className="text-gray-600 text-sm">
              Join a supportive network of learners aiming for global success.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
