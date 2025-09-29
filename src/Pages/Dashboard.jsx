// src/Pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, MessageSquare, Award } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const name = localStorage.getItem("userName");
    setUser({ email, name });
  }, []);

  const sections = [
    {
      id: 1,
      title: "Scholarships",
      desc: "Explore top global opportunities with deadlines, eligibility, and benefits.",
      icon: GraduationCap,
      link: "/scholarships",
    },
    {
      id: 2,
      title: "Success Stories",
      desc: "Read inspiring journeys of students who achieved scholarships worldwide.",
      icon: Award,
      link: "/stories",
    },
    {
      id: 3,
      title: "Q&A / Mentors",
      desc: "Ask questions and connect with verified mentors who’ve done it before.",
      icon: MessageSquare,
      link: "/qa",
    },
    {
      id: 4,
      title: "Courses",
      desc: "Upskill with hand-picked online courses in tech, design, and more.",
      icon: BookOpen,
      link: "/courses",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          Welcome {user?.name || user?.email || "Learner"} 🎓
        </h1>
        <p className="text-gray-200 max-w-2xl mx-auto">
          Your personalized hub for scholarships, mentorship, and global learning opportunities.
        </p>
      </header>

      {/* Sections */}
      <motion.main
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
        className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-grow"
      >
        {sections.map((s) => (
          <motion.a
            key={s.id}
            href={s.link}
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col"
          >
            <s.icon className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-600 text-sm flex-grow">{s.desc}</p>
            <span className="mt-4 text-blue-600 text-sm font-medium hover:underline">
              View More →
            </span>
          </motion.a>
        ))}
      </motion.main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center text-sm py-4 mt-auto">
        © {new Date().getFullYear()} EduBridge. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
