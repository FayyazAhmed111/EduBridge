import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
const ContactPage = () => {
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-14 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Contact Us</h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-blue-100">
          Have feedback or questions? We’d love to hear from you!
        </p>
      </section>

      {/* ✅ Contact Form Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          {submitted && (
            <div className="bg-green-100 text-green-700 text-center py-2 rounded mb-6">
              ✅ Your message has been sent successfully!
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-lg transition"
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
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
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
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
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
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
