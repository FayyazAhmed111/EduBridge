import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  GraduationCap,
  Building2,
  Search,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { getAllScholarships, getSuggestedScholarships } from "../services/scholarshipApi";

export default function ScholarshipsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suggestedLoading, setSuggestedLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const dummyImage =
    "https://images.unsplash.com/photo-1665567032056-4d22d92638da?q=80&w=1203&auto=format&fit=crop&ixlib=rb-4.1.0";

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    const loadData = async () => {
      setLoading(true);
      try {
        const data = await getAllScholarships();
        setScholarships(data);
      } catch (err) {
        console.error("Error fetching all scholarships:", err);
        setScholarships([]);
      } finally {
        setLoading(false);
      }
    };

    const loadSuggestions = async () => {
      if (!loggedIn) return;
      setSuggestedLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const data = await getSuggestedScholarships(token);
        setSuggested(data.items || []);
      } catch (err) {
        console.error("AI suggestion error:", err);
        setSuggested([]);
      } finally {
        setSuggestedLoading(false);
      }
    };

    if (loggedIn) {
      loadData();
      loadSuggestions();
    } else {
      setLoading(false);
    }
  }, []);

  const filteredScholarships = scholarships.filter((s) => {
    if (!searchQuery.trim()) return true;
    const text = `
      ${s.name || ""} ${s.field || ""} ${s.level || ""}
      ${s.type || ""} ${s.country || ""} ${s.organization || ""}
      ${s.eligibility || ""}
    `.toLowerCase();
    return text.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex flex-col">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Global Scholarships 2025
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-blue-100">
            Explore top international scholarships offering financial support,
            career exposure, and global study experiences.
          </p>
        </div>
      </section>

      {/* SEARCH BAR */}
      <div className="max-w-4xl mx-auto px-6 py-2 -mt-10 relative z-10">
        <div className="bg-white shadow-md rounded-xl w-fit md:w-xl flex items-center gap-3 px-5 py-3">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search scholarships (e.g., Private, Canada, Engineering)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 py-2 outline-none text-sm text-gray-700"
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="relative flex-1 mx-auto w-full px-6 py-16 bg-slate-50">

        {/* 🔮 AI SUGGESTED SCHOLARSHIPS */}
        {isLoggedIn && (
          <section className="w-full px-6 lg:px-12 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                Suggested Scholarships for You
              </h2>

              {suggestedLoading ? (
                <p className="text-gray-500 text-sm">Loading personalized suggestions...</p>
              ) : suggested.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No AI suggestions available. Complete your profile to get better recommendations.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {suggested.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200 flex flex-col hover:shadow-2xl transition-shadow duration-500"
                    >
                      {/* Image */}
                      <div className="relative w-full h-56 overflow-hidden">
                        <img
                          src={s.image || dummyImage}
                          alt={s.title || "Scholarship"}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                        <div className="absolute top-5 right-5">
                          <span className="inline-block px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-md shadow-md bg-blue-600/90 text-white">
                            AI Suggested
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-1">
                          {s.title || "Scholarship Name"}
                        </h2>

                        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                          {s.eligibility ||
                            s.reason ||
                            "This scholarship is recommended based on your profile and preferences."}
                        </p>

                        

                        <a
                          href={s.link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer mt-6 inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          Apply Now
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* 🧾 ALL SCHOLARSHIPS */}
        {loading ? (
          <div className="text-center text-gray-500 text-lg py-20">
            Loading scholarships...
          </div>
        ) : !isLoggedIn ? (
          <div className="flex justify-center items-center py-10">
            <div className="bg-white/90 px-8 py-6 rounded-xl shadow text-center border">
              <p className="text-lg font-semibold text-gray-700 mb-2">
                🔒 Please login to view scholarships
              </p>
              <p className="text-sm text-gray-500">
                Sign in to explore global opportunities and apply for scholarships.
              </p>
            </div>
          </div>
        ) : filteredScholarships.length === 0 ? (
          <p className="text-center text-gray-500 mt-20 text-lg">
            No scholarships found.
          </p>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              All Scholarships
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredScholarships.map((scholarship) => (
                <motion.div
                  key={scholarship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200 flex flex-col hover:shadow-2xl transition-shadow duration-500"
                >
                  <div className="relative w-full h-56 overflow-hidden">
                    <img
                      src={scholarship.image || dummyImage}
                      alt={scholarship.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-5 right-5">
                      <span
                        className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-md shadow-md ${scholarship.type === "Fully Funded"
                            ? "bg-green-500/90 text-white"
                            : "bg-amber-500/90 text-white"
                          }`}
                      >
                        {scholarship.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between p-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-1">
                      {scholarship.name}
                    </h2>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                      {scholarship.eligibility}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm mb-4 pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-2 text-slate-700">
                        <GraduationCap className="w-4 h-4 text-indigo-600" />
                        <span>{scholarship.level}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span>{scholarship.country}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Calendar className="w-4 h-4 text-red-600" />
                        <span>{scholarship.deadline}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Building2 className="w-4 h-4 text-green-600" />
                        <span>{scholarship.organization}</span>
                      </div>
                      <span className="font-semibold text-blue-700">
                        {scholarship.amount}
                      </span>
                    </div>

                    <a
                      href={scholarship.link}
                      className="cursor-pointer mt-6 inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Apply Now
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
