// // src/Pages/AboutPage.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
// const AboutPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* ✅ Navbar */}
//       <Navbar />

//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 text-center">
//         <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
//           About Edu Bridge
//         </h1>
//         <p className="max-w-2xl mx-auto text-base sm:text-lg text-blue-100">
//           Empowering students to unlock global opportunities through scholarships, mentorship, and guidance.
//         </p>
//       </section>

//       {/* Content Section */}
//       <main className="flex-1 max-w-4xl mx-auto px-6 py-12 space-y-10">
//         <div className="bg-white shadow-md rounded-2xl p-6 sm:p-10">
//           <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
//             Our Mission
//           </h2>
//           <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
//             <strong>Edu Bridge</strong> is a student-focused platform designed to
//             help university students access scholarships, connect with mentors,
//             and learn from successful seniors who have achieved international
//             education opportunities.
//             <br />
//             <br />
//             Our goal is to create a <strong>bridge</strong> between aspiring
//             students and the global academic world — making information about
//             funding, guidance, and study opportunities easily available.
//             <br />
//             <br />
//             Whether you’re preparing for scholarships, looking for mentorship, or
//             simply exploring options abroad, Edu Bridge aims to simplify your
//             journey.
//           </p>
//         </div>

//         {/* Values Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">Scholarships</h3>
//             <p className="text-gray-600 text-sm">
//               Access curated funding opportunities for international education.
//             </p>
//           </div>
//           <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">Mentorship</h3>
//             <p className="text-gray-600 text-sm">
//               Connect with seniors and mentors who’ve walked the same path.
//             </p>
//           </div>
//           <div className="bg-white shadow-md rounded-xl p-6 text-center hover:shadow-lg transition">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">Community</h3>
//             <p className="text-gray-600 text-sm">
//               Join a supportive network of learners aiming for global success.
//             </p>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default AboutPage;


import { useNavigate } from "react-router-dom"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { GraduationCap, Users, Globe, Heart } from "lucide-react"

const AboutPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r text-center from-blue-600 via-indigo-600 to-blue-600 text-white py-20 px-6 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto">

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">About Edu Bridge</h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-blue-100 leading-relaxed">
            Empowering students to unlock global opportunities through scholarships, mentorship, and guidance.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Mission Section */}
        <div className="bg-white shadow-xl rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Our Mission</h2>
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed text-base sm:text-lg">
              <p>
                <strong className="text-gray-800">Edu Bridge</strong> is a student-focused platform designed to help
                university students access scholarships, connect with mentors, and learn from successful seniors who
                have achieved international education opportunities.
              </p>
              <p>
                Our goal is to create a <strong className="text-gray-800">bridge</strong> between aspiring students and
                the global academic world — making information about funding, guidance, and study opportunities easily
                available.
              </p>
              <p>
                Whether you're preparing for scholarships, looking for mentorship, or simply exploring options abroad,
                Edu Bridge aims to simplify your journey.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">What We Offer</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Scholarships Card */}
            <div className="group bg-white shadow-lg rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">

              <div className="relative z-10">
                <div className="inline-flex p-4 bg-blue-500 rounded-2xl mb-4  duration-300">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Scholarships</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Access curated funding opportunities for international education.
                </p>
              </div>
            </div>

            {/* Mentorship Card */}
            <div className="group bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">

              <div className="relative z-10">
                <div className="inline-flex p-4 bg-blue-500 rounded-2xl mb-4  duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Mentorship</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Connect with seniors and mentors who've walked the same path.
                </p>
              </div>
            </div>

            {/* Community Card */}
            <div className="group bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">

              <div className="relative z-10">
                <div className="inline-flex p-4 bg-blue-500 rounded-2xl mb-4 duration-300">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Community</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Join a supportive network of learners aiming for global success.
                </p>
              </div>
            </div>
          </div>
        </div>


      </main>

      <Footer />
    </div>
  )
}

export default AboutPage
