import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const SuccessStoriesPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [stories, setStories] = useState([
    {
      id: 1,
      author: "Sarah Chen",
      title: "How I Got a Full Scholarship to MIT",
      description:
        "From a small town university to MIT with a fully funded scholarship. I share my timeline, SOP draft, and tips for interviews...",
      tag: "Fully Funded",
      time: "2 days ago",
      comments: 24,
    },
    {
      id: 2,
      author: "Ahmed Khan",
      title: "Half Scholarship Experience at Oxford",
      description:
        "Securing a half scholarship at Oxford was challenging but achievable. I explain how I prepared my research proposal, handled interviews, and funding...",
      tag: "Half Scholarship",
      time: "1 week ago",
      comments: 18,
    },
    {
      id: 3,
      author: "Maria Rodriguez",
      title: "Exchange Program Success Story",
      description:
        "My semester abroad changed everything. Here’s my guide on finding exchange programs, financial support, and cultural adjustments...",
      tag: "Exchange",
      time: "2 weeks ago",
      comments: 31,
    },
  ]);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTag, setNewTag] = useState("General");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const email = localStorage.getItem("userEmail");
    setIsLoggedIn(loggedIn);
    if (loggedIn && email) setUserEmail(email);
  }, []);

  const handleAddStory = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newStory = {
      id: Date.now(),
      author: userEmail || "Anonymous",
      title: newTitle,
      description: newDescription,
      tag: newTag,
      time: "Just now",
      comments: 0,
    };

    setStories([newStory, ...stories]);
    setShowModal(false);
    setNewTitle("");
    setNewDescription("");
    setNewTag("General");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-14 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Success Stories</h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-blue-100">
          Read inspiring journeys from students around the world who made it to their dream universities.
        </p>
      </section>

      {/* Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 gap-3 sm:gap-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Recent Stories</h2>
          <button
            onClick={() => {
              if (!isLoggedIn) {
                setErrorModal(true);
                return;
              }
              setShowModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-blue-700 transition"
          >
            Share My Story
          </button>
        </div>

        {/* Story List */}
        <div className="space-y-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white border rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">{story.title}</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded self-start sm:self-auto">
                  {story.tag}
                </span>
              </div>
              <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">
                {story.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500 mt-4 gap-1 sm:gap-0">
                <span>by {story.author} • {story.time}</span>
                <span>💬 {story.comments}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Story Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
            {/* Close */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Share Your Story</h2>

            <form className="space-y-4" onSubmit={handleAddStory}>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. How I got into Harvard"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Description</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Write your journey..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">Tag</label>
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option>Fully Funded</option>
                  <option>Half Scholarship</option>
                  <option>Exchange</option>
                  <option>General</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Publish Story
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6 relative text-center">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setErrorModal(false)}
            >
              ✕
            </button>
            <div className="text-4xl text-red-500 mb-3">⚠️</div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">Login Required</h2>
            <p className="text-gray-600 text-sm mb-4">
              Please login to share your success story.
            </p>
            <button
              onClick={() => setErrorModal(false)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SuccessStoriesPage;
