// // src/Pages/Dashboard.jsx
// import React, { useEffect, useState } from "react";
// import Navbar from "../Components/Navbar";
// import { motion } from "framer-motion";
// import { GraduationCap, BookOpen, MessageSquare, Award } from "lucide-react";

// const Dashboard = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const email = localStorage.getItem("userEmail");
//     const name = localStorage.getItem("userName");
//     setUser({ email, name });
//   }, []);

//   const sections = [
//     {
//       id: 1,
//       title: "Scholarships",
//       desc: "Explore top global opportunities with deadlines, eligibility, and benefits.",
//       icon: GraduationCap,
//       link: "/scholarships",
//     },
//     {
//       id: 2,
//       title: "Success Stories",
//       desc: "Read inspiring journeys of students who achieved scholarships worldwide.",
//       icon: Award,
//       link: "/stories",
//     },
//     {
//       id: 3,
//       title: "Q&A / Mentors",
//       desc: "Ask questions and connect with verified mentors who’ve done it before.",
//       icon: MessageSquare,
//       link: "/qa",
//     },
//     {
//       id: 4,
//       title: "Courses",
//       desc: "Upskill with hand-picked online courses in tech, design, and more.",
//       icon: BookOpen,
//       link: "/courses",
//     },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       <Navbar />

//       {/* Header */}
//       <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 text-center">
//         <h1 className="text-3xl sm:text-4xl font-bold mb-2">
//           Welcome {user?.name || user?.email || "Learner"} 🎓
//         </h1>
//         <p className="text-gray-200 max-w-2xl mx-auto">
//           Your personalized hub for scholarships, mentorship, and global learning opportunities.
//         </p>
//       </header>

//       {/* Sections */}
//       <motion.main
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={{
//           hidden: { opacity: 0 },
//           visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
//         }}
//         className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-grow"
//       >
//         {sections.map((s) => (
//           <motion.a
//             key={s.id}
//             href={s.link}
//             variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
//             className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col"
//           >
//             <s.icon className="w-12 h-12 text-blue-600 mb-4" />
//             <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
//             <p className="text-gray-600 text-sm flex-grow">{s.desc}</p>
//             <span className="mt-4 text-blue-600 text-sm font-medium hover:underline">
//               View More →
//             </span>
//           </motion.a>
//         ))}
//       </motion.main>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-400 text-center text-sm py-4 mt-auto">
//         © {new Date().getFullYear()} EduBridge. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default Dashboard;

"use client"

import { useEffect, useState } from "react"
import Navbar from "../Components/Navbar"
import { motion } from "framer-motion"
import { GraduationCap, BookOpen, MessageSquare, Award } from "lucide-react"

const Dashboard = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    const name = localStorage.getItem("userName")
    setUser({ email, name })
  }, [])

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
      desc: "Ask questions and connect with verified mentors who've done it before.",
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
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      {/* Header */}
      <header className="relative bg-gradient-to-r text-center from-blue-600 via-indigo-600 to-blue-600 text-white py-20 px-6 overflow-hidden">

        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-3"
          >
            Welcome {user?.name || user?.email || "Learner"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-100 text-lg max-w-2xl mx-auto px-4"
          >
            Your personalized hub for scholarships, mentorship, and global learning opportunities.
          </motion.p>
        </div>
      </header>

      {/* Sections */}
      <main

        className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-grow"
      >
        {sections.map((s) => (
          <motion.a
            key={s.id}
            href={s.link}
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
            className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 flex flex-col overflow-hidden hover:-translate-y-2"
          >


            {/* Content */}
            <div className="relative z-10">
              <div
                className={`w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center mb-6   duration-300`}
              >
                <s.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-bold mb-3 text-gray-900">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-4">{s.desc}</p>

              <span
                className={`inline-flex items-center text-sm font-semibold bg-gradient-to-r ${s.gradient} bg-clip-text text-transparent group-hover:translate-x-2 transition-transform duration-300`}
              >
                View More →
              </span>
            </div>


          </motion.a>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-400 text-center text-sm py-6 mt-auto border-t border-gray-700">
        <p>© {new Date().getFullYear()} EduBridge. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Dashboard
