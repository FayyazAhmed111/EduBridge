import React, { useState, useEffect } from "react";
import { BookOpen, Globe, Clock, Star, Search } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { getFreeCourses } from "../services/courseApi";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      const data = await getFreeCourses();
      setCourses(data);
      setFilteredCourses(data);
      setLoading(false);
    };
    loadCourses();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const results = courses.filter((c) =>
      `${c.title} ${c.category} ${c.description}`
        .toLowerCase()
        .includes(query)
    );
    setFilteredCourses(results);
  };

  const dummyImage =
    "https://images.unsplash.com/photo-1581092334426-1a664107f9a2?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex flex-col">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Free Udemy Courses
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-blue-100">
            Learn new skills and boost your career with 100% free premium Udemy courses.
          </p>
        </div>
      </section>

      {/* SEARCH BAR */}
      <div className="max-w-4xl mx-auto px-6 py-2 -mt-10 relative z-10">
        <div className="bg-white shadow-md rounded-xl w-full flex items-center gap-3 px-5 py-3">
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses (e.g., Web Development, Python, AI)"
            value={searchQuery}
            onChange={handleSearch}
            className="flex-1 py-2 outline-none text-sm text-gray-700"
          />
        </div>
      </div>

      {/* COURSES LIST */}
      <main className="relative flex-1 mx-auto w-full px-6 py-16 bg-slate-50">
        {loading ? (
          <div className="text-center text-gray-500 text-lg py-20">
            Loading free courses...
          </div>
        ) : filteredCourses.length === 0 ? (
          <p className="text-center text-gray-500 mt-20 text-lg">
            No courses found.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200 flex flex-col hover:shadow-2xl transition-shadow duration-500"
              >
                {/* Thumbnail */}
                <div className="relative w-full h-56 overflow-hidden">
                  <img
                    src={course.image || dummyImage}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10"></div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                    {course.title}
                  </h2>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {course.description || "No description available."}
                  </p>

                  <div className="flex flex-wrap gap-3 text-sm mb-4 pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2 text-slate-700">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      <span>{course.category || "General"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span>Udemy</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Clock className="w-4 h-4 text-red-600" />
                      <span>{course.duration || "Self-paced"}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{course.rating || "New"}</span>
                    </div>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>

                  <a
                    href={course.url || course.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer mt-6 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Enroll Now
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
