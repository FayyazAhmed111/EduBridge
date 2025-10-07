// // src/Pages/ScholarshipsPage.jsx
// import React from "react";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";

// const ScholarshipsPage = ({ isLoggedIn = true }) => {
//   const scholarships = [
//     {
//       id: 1,
//       title: "Chevening Scholarship (UK)",
//       type: "Fully Funded",
//       deadline: "November 7, 2025",
//       country: "United Kingdom",
//       description:
//         "The Chevening Scholarship provides full financial support for one-year master’s programs in the UK. It covers tuition, living expenses, and airfare.",
//       eligibility:
//         "Applicants must hold an undergraduate degree, have at least two years of work experience, and demonstrate strong leadership potential.",
//       benefits:
//         "Covers tuition fees, living allowance, economy class airfare to and from the UK, and additional grants for essential expenses.",
//       applyLink: "#",
//     },
//     {
//       id: 2,
//       title: "Erasmus Mundus Joint Master Degree",
//       type: "Fully Funded",
//       deadline: "March 15, 2025",
//       country: "Europe (Multiple Countries)",
//       description:
//         "Erasmus Mundus offers fully funded scholarships for international students to study in multiple European countries with travel and living costs included.",
//       eligibility:
//         "Open to students from all countries with an undergraduate degree. Applicants should demonstrate academic excellence and international motivation.",
//       benefits:
//         "Covers participation costs, travel, installation costs, and monthly subsistence allowance for the entire study period.",
//       applyLink: "#",
//     },
//     {
//       id: 3,
//       title: "Fulbright Foreign Student Program (USA)",
//       type: "Fully Funded",
//       deadline: "May 1, 2025",
//       country: "United States",
//       description:
//         "A prestigious program for master’s and PhD students offering tuition, living stipend, health insurance, and round-trip airfare.",
//       eligibility:
//         "Open to international students with strong academic backgrounds and leadership qualities. Applicants must meet English language proficiency requirements.",
//       benefits:
//         "Provides full tuition, monthly living stipend, accommodation support, health insurance, and airfare to the U.S.",
//       applyLink: "#",
//     },
//     {
//       id: 4,
//       title: "DAAD Scholarship (Germany)",
//       type: "Partially Funded",
//       deadline: "October 31, 2025",
//       country: "Germany",
//       description:
//         "DAAD offers support for postgraduate studies in Germany. It includes a monthly stipend, health insurance, and travel allowance.",
//       eligibility:
//         "International graduates with at least two years of professional experience and a bachelor's degree can apply.",
//       benefits:
//         "Monthly payments, travel allowance, health and accident insurance, and possible tuition fee coverage depending on program.",
//       applyLink: "#",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Navbar */}
//       <Navbar />

//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16 px-6 text-center">
//         <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
//           🌍 Global Scholarships 2025
//         </h1>
//         <p className="max-w-2xl mx-auto text-sm sm:text-base text-blue-100">
//           Explore top international scholarships offering financial support,
//           career exposure, and global study experiences. Find your next academic
//           opportunity today.
//         </p>
//       </section>

//       {/* Scholarships List with Overlay */}
//       <main className="relative flex-1 max-w-6xl mx-auto w-full px-6 py-12">
//         <div
//           className={`transition-all duration-500 ${
//             !isLoggedIn ? "blur-lg pointer-events-none select-none" : ""
//           }`}
//         >
//           <div className="space-y-8">
//             {scholarships.map((scholarship) => (
//               <div
//                 key={scholarship.id}
//                 className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
//               >
//                 {/* Header */}
//                 <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
//                   <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
//                     {scholarship.title}
//                   </h2>
//                   <span
//                     className={`mt-2 sm:mt-0 text-xs sm:text-sm px-3 py-1 rounded-full ${
//                       scholarship.type === "Fully Funded"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-yellow-100 text-yellow-700"
//                     }`}
//                   >
//                     {scholarship.type}
//                   </span>
//                 </div>

//                 {/* Description */}
//                 <p className="text-gray-700 text-sm sm:text-base mb-3 leading-relaxed">
//                   {scholarship.description}
//                 </p>

//                 {/* Info Grid */}
//                 <div className="grid sm:grid-cols-2 gap-4 text-gray-600 text-sm sm:text-base">
//                   <p>
//                     <strong>📍 Country:</strong> {scholarship.country}
//                   </p>
//                   <p>
//                     <strong>🗓️ Deadline:</strong> {scholarship.deadline}
//                   </p>
//                 </div>

//                 {/* Details */}
//                 <div className="mt-4 space-y-3">
//                   <div>
//                     <h3 className="text-gray-800 font-semibold mb-1 text-sm sm:text-base">
//                       🎯 Eligibility:
//                     </h3>
//                     <p className="text-gray-600 text-sm sm:text-[0.95rem] leading-relaxed">
//                       {scholarship.eligibility}
//                     </p>
//                   </div>

//                   <div>
//                     <h3 className="text-gray-800 font-semibold mb-1 text-sm sm:text-base">
//                       💰 Benefits:
//                     </h3>
//                     <p className="text-gray-600 text-sm sm:text-[0.95rem] leading-relaxed">
//                       {scholarship.benefits}
//                     </p>
//                   </div>

//                   <div>
//                     <a
//                       href={scholarship.applyLink}
//                       className="inline-block mt-3 text-blue-600 hover:text-blue-800 text-sm sm:text-base font-medium"
//                     >
//                       Apply Now →
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Strong Overlay */}
//         {!isLoggedIn && (
//           <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
//             <p className="text-white text-lg sm:text-2xl font-semibold bg-black/60 px-6 py-3 rounded-lg shadow-lg">
//               🔒 Please login to view scholarships
//             </p>
//           </div>
//         )}
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default ScholarshipsPage;



// import { useState } from "react"
// import { Calendar, MapPin, GraduationCap, ArrowRight } from "lucide-react"
// import { motion } from "framer-motion"
// import Navbar from "../Components/Navbar"
// import Footer from "../Components/Footer"

// export default function ScholarshipsPage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(true)

//   const scholarships = [
//     {
//       id: 1,
//       title: "Chevening Scholarship (UK)",
//       type: "Fully Funded",
//       deadline: "November 7, 2025",
//       country: "United Kingdom",
//       description:
//         "The Chevening Scholarship provides full financial support for one-year master's programs in the UK. It covers tuition, living expenses, and airfare.",
//       eligibility:
//         "Applicants must hold an undergraduate degree, have at least two years of work experience, and demonstrate strong leadership potential.",
//       benefits:
//         "Covers tuition fees, living allowance, economy class airfare to and from the UK, and additional grants for essential expenses.",
//       applyLink: "#",
//       image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
//     },
//     {
//       id: 2,
//       title: "Erasmus Mundus Joint Master Degree",
//       type: "Fully Funded",
//       deadline: "March 15, 2025",
//       country: "Europe (Multiple Countries)",
//       description:
//         "Erasmus Mundus offers fully funded scholarships for international students to study in multiple European countries with travel and living costs included.",
//       eligibility:
//         "Open to students from all countries with an undergraduate degree. Applicants should demonstrate academic excellence and international motivation.",
//       benefits:
//         "Covers participation costs, travel, installation costs, and monthly subsistence allowance for the entire study period.",
//       applyLink: "#",
//       image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop",
//     },
//     {
//       id: 3,
//       title: "Fulbright Foreign Student Program (USA)",
//       type: "Fully Funded",
//       deadline: "May 1, 2025",
//       country: "United States",
//       description:
//         "A prestigious program for master's and PhD students offering tuition, living stipend, health insurance, and round-trip airfare.",
//       eligibility:
//         "Open to international students with strong academic backgrounds and leadership qualities. Applicants must meet English language proficiency requirements.",
//       benefits:
//         "Provides full tuition, monthly living stipend, accommodation support, health insurance, and airfare to the U.S.",
//       applyLink: "#",
//       image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
//     },
//     {
//       id: 4,
//       title: "DAAD Scholarship (Germany)",
//       type: "Partially Funded",
//       deadline: "October 31, 2025",
//       country: "Germany",
//       description:
//         "DAAD offers support for postgraduate studies in Germany. It includes a monthly stipend, health insurance, and travel allowance.",
//       eligibility:
//         "International graduates with at least two years of professional experience and a bachelor's degree can apply.",
//       benefits:
//         "Monthly payments, travel allowance, health and accident insurance, and possible tuition fee coverage depending on program.",
//       applyLink: "#",
//       image: "https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?w=800&h=600&fit=crop",
//     },
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex flex-col">
//       <Navbar />

//       <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white py-20 px-6 overflow-hidden">
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzktNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzktNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

//         <div className="max-w-6xl mx-auto text-center relative z-10">
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
//             {/* <div className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
//               <GraduationCap className="w-5 h-5" />
//               <span className="text-sm font-medium">Opportunities</span>
//             </div> */}

//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
//               Global Scholarships 2025
//             </h1>

//             <p className="max-w-3xl mx-auto text-lg sm:text-xl text-blue-50 leading-relaxed">
//               Explore top international scholarships offering financial support, career exposure, and global study
//               experiences. Find your next academic opportunity today.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* <main className="relative flex-1 max-w-6xl mx-auto w-full px-6 py-16">
//         <div className={`transition-all duration-500 ${!isLoggedIn ? "blur-lg pointer-events-none select-none" : ""}`}>
//           <div className="space-y-8">
//             {scholarships.map((scholarship, index) => (
//               <motion.div
//                 key={scholarship.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200"
//               >
//                 <div className="flex flex-col lg:flex-row">
//                   <div className="relative lg:w-2/5 h-64 lg:h-auto overflow-hidden">
//                     <img
//                       src={scholarship.image || ""}
//                       alt={scholarship.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 transition-opacity duration-500"></div>

//                     <div className="absolute top-6 left-6">
//                       <span
//                         className={`inline-block px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md shadow-lg ${scholarship.type === "Fully Funded"
//                           ? "bg-green-500/90 text-white"
//                           : "bg-amber-500/90 text-white"
//                           }`}
//                       >
//                         {scholarship.type}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="lg:w-3/5 p-8 lg:p-10">
//                     <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4  transition-colors">
//                       {scholarship.title}
//                     </h2>

//                     <p className="text-slate-700 leading-relaxed mb-6">{scholarship.description}</p>

//                     <div className="flex flex-wrap gap-6 text-sm mb-6 pb-6 border-b border-slate-200">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
//                           <MapPin className="w-4 h-4 text-blue-600" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-slate-500 font-medium">Country</p>
//                           <p className="text-slate-900 font-semibold">{scholarship.country}</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
//                           <Calendar className="w-4 h-4 text-red-600" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-slate-500 font-medium">Deadline</p>
//                           <p className="text-slate-900 font-semibold">{scholarship.deadline}</p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-4 mb-6">
//                       <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
//                         <h3 className="text-slate-900 font-bold mb-2 flex items-center gap-2">
//                           <span className="text-lg">🎯</span>
//                           Eligibility
//                         </h3>
//                         <p className="text-slate-700 text-sm leading-relaxed">{scholarship.eligibility}</p>
//                       </div>

//                       <div className="bg-green-50 rounded-xl p-4 border border-green-100">
//                         <h3 className="text-slate-900 font-bold mb-2 flex items-center gap-2">
//                           <span className="text-lg">💰</span>
//                           Benefits
//                         </h3>
//                         <p className="text-slate-700 text-sm leading-relaxed">{scholarship.benefits}</p>
//                       </div>
//                     </div>

//                     <a
//                       href={scholarship.applyLink}
//                       className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg group/btn"
//                     >
//                       Apply Now
//                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /> 
//                     </a>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {!isLoggedIn && (
//           <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10 rounded-3xl">
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className="text-center bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4"
//             >
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <GraduationCap className="w-8 h-8 text-blue-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-900 mb-2">Login Required</h3>
//               <p className="text-slate-600 mb-6">Please login to view and apply for scholarships</p>
//               <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg">
//                 Login to Continue
//               </button>
//             </motion.div>
//           </div>
//         )}
//       </main> */}


//       <main className="relative flex-1 mx-auto w-full px-6 py-16 bg-slate-50">
//         <div className={`transition-all duration-500 ${!isLoggedIn ? "blur-lg pointer-events-none select-none" : ""}`}>
//           {/* Responsive grid — 1 on mobile, 2 on tablet, 3 on desktop */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {scholarships.map((scholarship, index) => (
//               <motion.div
//                 key={scholarship.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 flex flex-col"
//               >
//                 {/* Image Section */}
//                 <div className="relative w-full h-56 overflow-hidden">
//                   <img
//                     src={scholarship.image || ""}
//                     alt={scholarship.title}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>

//                   <div className="absolute top-5 left-5">
//                     <span
//                       className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-md shadow-md ${scholarship.type === "Fully Funded"
//                         ? "bg-green-500/90 text-white"
//                         : "bg-amber-500/90 text-white"
//                         }`}
//                     >
//                       {scholarship.type}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Content Section */}
//                 <div className="flex-1 flex flex-col justify-between p-6">
//                   <div>
//                     <h2 className="text-xl font-bold text-slate-900 mb-2">{scholarship.title}</h2>
//                     <p className="text-slate-700 text-sm mb-4 leading-relaxed line-clamp-3">
//                       {scholarship.description}
//                     </p>

//                     <div className="flex flex-wrap gap-6 text-sm mb-4 pb-4 border-b border-slate-200">
//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
//                           <MapPin className="w-4 h-4 text-blue-600" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-slate-500 font-medium">Country</p>
//                           <p className="text-slate-900 font-semibold">{scholarship.country}</p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-2">
//                         <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
//                           <Calendar className="w-4 h-4 text-red-600" />
//                         </div>
//                         <div>
//                           <p className="text-xs text-slate-500 font-medium">Deadline</p>
//                           <p className="text-slate-900 font-semibold">{scholarship.deadline}</p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="space-y-3">
//                       <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
//                         <h3 className="text-slate-900 font-semibold mb-1 flex items-center gap-2">
//                           <span>🎯</span> Eligibility
//                         </h3>
//                         <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
//                           {scholarship.eligibility}
//                         </p>
//                       </div>

//                       <div className="bg-green-50 rounded-xl p-3 border border-green-100">
//                         <h3 className="text-slate-900 font-semibold mb-1 flex items-center gap-2">
//                           <span>💰</span> Benefits
//                         </h3>
//                         <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
//                           {scholarship.benefits}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <a
//                     href={scholarship.applyLink}
//                     className="mt-6 inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold  transition-all duration-300 shadow-md hover:shadow-lg"
//                   >
//                     Apply Now
//                   </a>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Login Overlay */}
//         {!isLoggedIn && (
//           <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm z-10 rounded-3xl">
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className="text-center bg-white rounded-2xl p-8 shadow-2xl max-w-md mx-4"
//             >
//               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <GraduationCap className="w-8 h-8 text-blue-600" />
//               </div>
//               <h3 className="text-2xl font-bold text-slate-900 mb-2">Login Required</h3>
//               <p className="text-slate-600 mb-6">Please login to view and apply for scholarships</p>
//               <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg">
//                 Login to Continue
//               </button>
//             </motion.div>
//           </div>
//         )}
//       </main>
//       <Footer />
//     </div>
//   )
// }
import { useState, useEffect } from "react";
import { Calendar, MapPin, GraduationCap, Building2, Search } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { fetchScholarships } from "../services/scholarshipService";

export default function ScholarshipsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const loadData = async () => {
        setLoading(true);
        const data = await fetchScholarships();
        setScholarships(data);
        setLoading(false);
      };
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  const filteredScholarships = scholarships.filter((search) => {
    if (!searchQuery.trim()) return true;
    const hay = `
      ${search.name || ""}
      ${search.title || ""}
      ${search.organization || ""}
      ${search.country || ""}
      ${search.level || ""}
      ${search.type || ""}
      ${search.eligibility || ""}
    `.toLowerCase();
    return hay.includes(searchQuery.toLowerCase());
  });

  const dummyImage =
    "https://images.unsplash.com/photo-1665567032056-4d22d92638da?q=80&w=1203&auto=format&fit=crop&ixlib=rb-4.1.0";

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
        <div className="bg-white shadow-md rounded-xl w-fit md:w-xl flex items-center gap-3 px-5 py-3" >
          <Search className="text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search scholarships (e.g., Canada, Fully Funded, Computer Science)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 py-2 outline-none text-sm text-gray-700"
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="relative flex-1 mx-auto w-full px-6 py-16 bg-slate-50">
        {loading ? (
          <div className="text-center text-gray-500 text-lg py-20">
            Loading scholarships...
          </div>
        ) : !isLoggedIn ? (
          <div className="flex justify-center items-center py-32">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredScholarships.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-200 flex flex-col hover:shadow-2xl transition-shadow duration-500"
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <img
                    src={s.image || dummyImage}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
                  <div className="absolute top-5 right-5">
                    <span
                      className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold backdrop-blur-md shadow-md ${s.type === "Fully Funded"
                        ? "bg-green-500/90 text-white"
                        : "bg-amber-500/90 text-white"
                        }`}
                    >
                      {s.type}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-1">
                    {s.name}
                  </h2>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {s.eligibility}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm mb-4 pb-3 border-b border-slate-200">
                    <div className="flex items-center gap-2 text-slate-700">
                      <GraduationCap className="w-4 h-4 text-indigo-600" />
                      <span>{s.level}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>{s.country}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Calendar className="w-4 h-4 text-red-600" />
                      <span>{s.deadline}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Building2 className="w-4 h-4 text-green-600" />
                      <span>{s.organization}</span>
                    </div>
                    <span className="font-semibold text-blue-700">
                      {s.amount}
                    </span>
                  </div>

                  <a
                    href={s.link}
                    className="cursor-pointer mt-6 inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Apply Now
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
