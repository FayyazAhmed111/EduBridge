import React from "react";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {["Mentors", "Students", "Scholarships", "Testimonials"].map((item, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
          >
            <h3 className="font-semibold text-gray-700 dark:text-gray-200">{item}</h3>
            <p className="text-2xl font-bold text-blue-600 mt-2">{Math.floor(Math.random() * 100)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
