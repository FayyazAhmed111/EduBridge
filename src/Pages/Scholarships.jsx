// src/pages/ScholarshipsPage.jsx
import React from "react";

const ScholarshipsPage = () => {
  const scholarships = [
    {
      id: 1,
      title: "Chevening Scholarship (UK)",
      type: "Fully Funded",
      deadline: "November 7, 2025",
      country: "United Kingdom",
      description:
        "The Chevening Scholarship provides full financial support for one-year master’s programs in the UK. It covers tuition, living expenses, and airfare.",
      eligibility:
        "Applicants must hold an undergraduate degree, have at least two years of work experience, and demonstrate strong leadership potential.",
      benefits:
        "Covers tuition fees, living allowance, economy class airfare to and from the UK, and additional grants for essential expenses.",
      applyLink: "#",
    },
    {
      id: 2,
      title: "Erasmus Mundus Joint Master Degree",
      type: "Fully Funded",
      deadline: "March 15, 2025",
      country: "Europe (Multiple Countries)",
      description:
        "Erasmus Mundus offers fully funded scholarships for international students to study in multiple European countries with travel and living costs included.",
      eligibility:
        "Open to students from all countries with an undergraduate degree. Applicants should demonstrate academic excellence and international motivation.",
      benefits:
        "Covers participation costs, travel, installation costs, and monthly subsistence allowance for the entire study period.",
      applyLink: "#",
    },
    {
      id: 3,
      title: "Fulbright Foreign Student Program (USA)",
      type: "Fully Funded",
      deadline: "May 1, 2025",
      country: "United States",
      description:
        "A prestigious program for master’s and PhD students offering tuition, living stipend, health insurance, and round-trip airfare.",
      eligibility:
        "Open to international students with strong academic backgrounds and leadership qualities. Applicants must meet English language proficiency requirements.",
      benefits:
        "Provides full tuition, monthly living stipend, accommodation support, health insurance, and airfare to the U.S.",
      applyLink: "#",
    },
    {
      id: 4,
      title: "DAAD Scholarship (Germany)",
      type: "Partially Funded",
      deadline: "October 31, 2025",
      country: "Germany",
      description:
        "DAAD offers support for postgraduate studies in Germany. It includes a monthly stipend, health insurance, and travel allowance.",
      eligibility:
        "International graduates with at least two years of professional experience and a bachelor's degree can apply.",
      benefits:
        "Monthly payments, travel allowance, health and accident insurance, and possible tuition fee coverage depending on program.",
      applyLink: "#",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          🌍 Global Scholarships 2025
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Explore top international scholarships offering financial support,
          career exposure, and global study experiences. Find your next academic
          opportunity today.
        </p>
      </div>

      {/* Scholarships List */}
      <div className="space-y-8">
        {scholarships.map((scholarship) => (
          <div
            key={scholarship.id}
            className="border rounded-2xl p-6 shadow-md hover:shadow-lg transition"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                {scholarship.title}
              </h2>
              <span
                className={`mt-2 sm:mt-0 text-xs sm:text-sm px-3 py-1 rounded-full ${
                  scholarship.type === "Fully Funded"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {scholarship.type}
              </span>
            </div>

            {/* Main Info */}
            <p className="text-gray-700 text-sm sm:text-base mb-3 leading-relaxed">
              {scholarship.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 text-gray-600 text-sm sm:text-base">
              <p>
                <strong>📍 Country:</strong> {scholarship.country}
              </p>
              <p>
                <strong>🗓️ Deadline:</strong> {scholarship.deadline}
              </p>
            </div>

            {/* Details */}
            <div className="mt-4 space-y-3">
              <div>
                <h3 className="text-gray-800 font-semibold mb-1 text-sm sm:text-base">
                  🎯 Eligibility:
                </h3>
                <p className="text-gray-600 text-sm sm:text-[0.95rem] leading-relaxed">
                  {scholarship.eligibility}
                </p>
              </div>

              <div>
                <h3 className="text-gray-800 font-semibold mb-1 text-sm sm:text-base">
                  💰 Benefits:
                </h3>
                <p className="text-gray-600 text-sm sm:text-[0.95rem] leading-relaxed">
                  {scholarship.benefits}
                </p>
              </div>

              <div>
                <a
                  href={scholarship.applyLink}
                  className="inline-block mt-3 text-blue-600 hover:text-blue-800 text-sm sm:text-base font-medium"
                >
                  Apply Now →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipsPage;
