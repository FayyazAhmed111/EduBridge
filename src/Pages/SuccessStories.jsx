import React, { useState, useEffect } from "react";
import { MessageSquare, Clock, User, Plus, X } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { getTestimonials, addTestimonial } from "../services/testimonialApi";

export default function SuccessStoriesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState("");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [newStory, setNewStory] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const email = localStorage.getItem("userEmail");
    const accessToken = localStorage.getItem("accessToken");

    setIsLoggedIn(loggedIn);
    setUserEmail(email || "");
    setToken(accessToken || "");

    if (loggedIn && accessToken) loadTestimonials(accessToken);
    else setLoading(false);
  }, []);

  const loadTestimonials = async (token) => {
    try {
      const data = await getTestimonials(token);
      setStories(data.reverse());
    } catch (err) {
      console.error("Failed to fetch testimonials:", err);
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStory = async (e) => {
    e.preventDefault();
    if (!newStory.trim()) return;

    try {
      await addTestimonial(newStory, token);
      alert("Testimonial submitted successfully! Pending admin approval.");
      setShowModal(false);
      setNewStory("");
      await loadTestimonials(token);
    } catch (err) {
      console.error("Error adding testimonial:", err);
      alert("Failed to submit. Please try again later.");
    }
  };

  const getInitials = (name) =>
    name
      ?.split(" ")
      ?.map((n) => n[0])
      ?.join("")
      ?.toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white py-20 px-6">
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Success Stories</h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Inspiring journeys from students who made it to their dream universities.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Student Testimonials
            </h2>
            <p className="text-gray-600 mt-1">Real voices from EduBridge students</p>
          </div>
          <button
            onClick={() => {
              if (!isLoggedIn) return setErrorModal(true);
              setShowModal(true);
            }}
            className="cursor-pointer group bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2 justify-center"
          >
            <Plus className="w-5 h-5" />
            Share My Story
          </button>
        </div>

        {/* Stories List */}
        {loading ? (
          <div className="text-center text-gray-500">Loading testimonials...</div>
        ) : stories.length === 0 ? (
          <p className="text-center text-gray-500">No testimonials yet.</p>
        ) : (
          <div className="space-y-6">
            {stories.map((story) => (
              <div
                key={story._id}
                className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                    {getInitials(story.userId?.name || "User")}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {story.userId?.name || "Anonymous Student"}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                          {/* <User className="w-4 h-4" /> */}
                          {/* <span>{story.userId?.email}</span> */}
                          {/* <span className="text-gray-400">•</span> */}
                          <Clock className="w-4 h-4" />
                          <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          story.status === "approved"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-gray-100 text-gray-700 border-gray-200"
                        }`}
                      >
                        {story.status === "approved" ? "Student" : "Pending"}
                      </span>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {story.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Story Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Share Your Story</h2>
            <p className="text-gray-600 mb-6">Inspire others with your journey</p>

            <form onSubmit={handleAddStory}>
              <textarea
                value={newStory}
                onChange={(e) => setNewStory(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                rows={6}
                placeholder="Share your success journey, challenges, and how you achieved your goals..."
                required
              />
              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
              >
                Publish Story
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative text-center">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setErrorModal(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Login Required</h2>
            <p className="text-gray-600 mb-6">
              Please login to share your success story with the community.
            </p>
            <button
              onClick={() => setErrorModal(false)}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
