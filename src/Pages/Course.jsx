import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const CoursesPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const courses = [
    {
      id: 1,
      title: "Full-Stack Web Development",
      description:
        "Learn HTML, CSS, JavaScript, React, Node.js, and databases to build complete applications.",
      difficulty: "Intermediate",
      duration: "12 weeks",
    },
    {
      id: 2,
      title: "Data Science & AI",
      description:
        "Master Python, data analysis, machine learning, and AI concepts with real-world projects.",
      difficulty: "Advanced",
      duration: "16 weeks",
    },
    {
      id: 3,
      title: "UI/UX Design",
      description:
        "Design modern and user-friendly digital experiences with Figma, prototyping, and usability testing.",
      difficulty: "Beginner",
      duration: "8 weeks",
    },
    {
      id: 4,
      title: "Cloud Computing (AWS & Azure)",
      description:
        "Get hands-on with AWS & Azure, learn deployment, serverless apps, and cloud security.",
      difficulty: "Intermediate",
      duration: "10 weeks",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-14 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Explore Courses</h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-blue-100">
          Learn new skills, advance your career, and get certified with our curated online courses.
        </p>
      </section>

      {/* Courses Section */}
      <main className="relative flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        {/* Overlay if not logged in */}
        {!isLoggedIn && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-md">
            <p className="text-lg font-semibold text-gray-800 bg-white px-6 py-3 rounded-lg shadow-md border">
              🔒 Please login to view available courses
            </p>
          </div>
        )}

        <div className={`grid gap-8 md:grid-cols-2 ${!isLoggedIn ? "blur-sm select-none pointer-events-none" : ""}`}>
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">{course.title}</h2>
                <p className="text-gray-600 text-sm sm:text-base mt-2">{course.description}</p>
                <div className="mt-4 text-sm text-gray-500 space-y-1">
                  <p>🎯 Difficulty: <span className="font-medium">{course.difficulty}</span></p>
                  <p>⏳ Duration: <span className="font-medium">{course.duration}</span></p>
                </div>
              </div>
              <div className="mt-6">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                  Enroll Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CoursesPage;
