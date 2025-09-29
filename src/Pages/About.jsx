// src/Pages/AboutPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center sm:text-left">
        About Edu Bridge
      </h1>
      <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">
        <strong>Edu Bridge</strong> is a student-focused platform designed to
        help university students access scholarships, connect with mentors, and
        learn from successful seniors who have achieved international education
        opportunities. <br />
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

      <div className="flex justify-center sm:justify-start">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
