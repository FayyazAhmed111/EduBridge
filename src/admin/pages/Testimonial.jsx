import React, { useState } from "react";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([
    { id: 1, name: "Ali Raza", text: "Great platform for learning!", status: "Visible" },
    { id: 2, name: "Sana Tariq", text: "Mentors are very helpful.", status: "Hidden" },
  ]);

  const toggleVisibility = (id) => {
    setTestimonials(
      testimonials.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Visible" ? "Hidden" : "Visible" }
          : t
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Testimonials</h1>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold text-blue-600">{t.name}</h3>
              <p className="text-gray-700 dark:text-gray-300">{t.text}</p>
              <p
                className={`text-sm font-medium ${
                  t.status === "Visible" ? "text-green-500" : "text-red-500"
                }`}
              >
                {t.status}
              </p>
            </div>
            <button
              onClick={() => toggleVisibility(t.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
            >
              Toggle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
