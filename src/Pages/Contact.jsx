// src/Pages/ContactPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-10">
     <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">
  Contact Us
</h1>

      <p className="text-gray-600 text-sm sm:text-base mb-6 text-center sm:text-left">
        Have feedback or questions? We’d love to hear from you!
      </p>

      {submitted && (
        <div className="bg-green-100 text-green-700 text-center py-2 rounded mb-6">
          ✅ Your message has been sent successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Write your message here..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition"
        >
          Submit
        </button>
      </form>

      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 cursor-pointer hover:underline text-sm font-medium"
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default ContactPage;
