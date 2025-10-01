import React from "react";

export default function Scholarships() {
  const scholarships = [
    { id: 1, name: "Need-Based", amount: "$1000", eligibility: "Low income" },
    { id: 2, name: "Merit-Based", amount: "$1500", eligibility: "Top 10%" },
    { id: 3, name: "Women in Tech", amount: "$1200", eligibility: "Female students" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Scholarships</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {scholarships.map((scholar) => (
          <div
            key={scholar.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold text-blue-600">
              {scholar.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Amount: <span className="font-bold">{scholar.amount}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Eligibility: {scholar.eligibility}
            </p>
            <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
