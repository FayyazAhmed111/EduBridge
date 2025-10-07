// import { motion } from "framer-motion";
// import {
//   BookOpen,
//   Star,
//   Users,
//   GraduationCap,
//   MessageSquare,
//   Award,
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../Components/Navbar";
// import { Card, CardContent } from "../Components/Cards";
// import Footer from "../Components/Footer";
// import LoginModal from "../Modal/LoginModal";

// export default function LandingPage() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [cardsPerView, setCardsPerView] = useState(3);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const updateCardsPerView = () => {
//       if (window.innerWidth < 768) {
//         setCardsPerView(1);
//       } else {
//         setCardsPerView(3);
//       }
//     };
//     updateCardsPerView();
//     window.addEventListener("resize", updateCardsPerView);
//     return () => window.removeEventListener("resize", updateCardsPerView);
//   }, []);

//   const courses = [
//     { title: "Full-Stack Development", desc: "Master React, Node.js, and databases.", rating: 4.9 },
//     { title: "Data Science & AI", desc: "Hands-on Python, ML models, and AI tools.", rating: 4.8 },
//     { title: "UI/UX Design", desc: "Design modern, user-friendly digital products.", rating: 4.7 },
//     { title: "Cybersecurity", desc: "Defend systems, networks, and applications.", rating: 4.6 },
//     { title: "Digital Marketing", desc: "SEO, social media, and analytics.", rating: 4.5 },
//     { title: "Cloud Computing", desc: "AWS, Azure, and Google Cloud fundamentals.", rating: 4.7 },
//     { title: "Entrepreneurship", desc: "Build, launch, and scale your own startup.", rating: 4.8 },
//   ];

//   // Previous Slide
//   const prevSlide = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? courses.length - cardsPerView : prev - 1
//     );
//   };

//   // Next Slide
//   const nextSlide = () => {
//     setCurrentIndex((prev) =>
//       prev >= courses.length - cardsPerView ? 0 : prev + 1
//     );
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-white text-gray-900">
//       <Navbar />

//       {/*  Hero Section */}
//       <section
//         className="relative h-screen w-full flex items-center justify-center text-center text-white"
//         style={{
//           backgroundImage: `url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1920&q=80')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/60"></div>

//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           className="relative z-10 max-w-3xl px-6"
//         >
//           <h1 className="text-4xl sm:text-6xl font-bold leading-tight uppercase">
//             Build Your Future <br /> With{" "}
//             <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
//               EduBridge
//             </span>
//           </h1>
//           <p className="mt-6 text-lg sm:text-xl text-gray-200">
//             Scholarships • Mentorship • Success Stories — all in one place.
//             Learn, connect, and unlock opportunities worldwide.
//           </p>

//           <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
//             <button
//               onClick={() => setShowLogin(true)}
//               className="px-6 py-3 rounded-lg bg-black text-white font-semibold shadow-md hover:bg-gray-800 transition"
//             >
//               Get Started
//             </button>
//             <button
//               onClick={() => navigate("/scholarships")}
//               className="px-6 py-3 rounded-lg bg-white text-black font-semibold shadow hover:bg-gray-100 transition"
//             >
//               Browse Opportunities
//             </button>
//           </div>

//           <div className="mt-10 flex justify-center gap-8 text-sm sm:text-base">
//             <div className="flex items-center gap-2">
//               <Users className="w-5 h-5 text-blue-400" /> 4 Learners
//             </div>
//             <div className="flex items-center gap-2">
//               <Star className="w-5 h-5 text-yellow-400" /> 5/5 Avg Rating
//             </div>
//           </div>
//         </motion.div>
//       </section>

//       {/*  Features Section */}
//       <motion.section
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         viewport={{ once: true }}
//         className="py-20 bg-gray-50 px-6"
//       >
//         <h3 className="text-3xl font-bold text-center mb-12">
//           Why Choose EduBridge?
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {[
//             {
//               icon: GraduationCap,
//               title: "Scholarships",
//               desc: "Curated global opportunities with deadlines & benefits.",
//             },
//             {
//               icon: MessageSquare,
//               title: "Mentorship",
//               desc: "Connect with seniors who secured scholarships abroad.",
//             },
//             {
//               icon: Award,
//               title: "Success Stories",
//               desc: "Get inspired from real students who made it happen.",
//             },
//           ].map((f, i) => (
//             <motion.div key={i}>
//               <Card className="text-center p-8 rounded-2xl hover:shadow-xl transition bg-white min-h-[280px] flex flex-col justify-center">
//                 <f.icon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
//                 <h4 className="text-xl font-semibold">{f.title}</h4>
//                 <p className="text-gray-600 mt-2 text-sm">{f.desc}</p>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//    {/* Courses Slider Section */}
// <motion.section
//   initial={{ opacity: 0 }}
//   whileInView={{ opacity: 1 }}
//   id="courses"
//   className="py-20 px-6 bg-gray-50"
// >
//   <h3 className="text-3xl font-bold text-center mb-12">
//     Top Picks For You
//   </h3>

//   <div className="relative max-w-6xl mx-auto">
//     <div className="overflow-hidden">
//       <motion.div
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{
//           transform: `translateX(-${(currentIndex * 100) / courses.length}%)`,
//           width: `${(courses.length / cardsPerView) * 100}%`,
//         }}
//       >
//         {courses.map((c, i) => (
//           <div
//             key={i}
//             className="px-4"
//             style={{
//               flex: `0 0 ${100 / courses.length}%`,
//               maxWidth: `${100 / courses.length}%`,
//             }}
//           >
//             <Card className="rounded-2xl hover:shadow-lg transition bg-white min-h-[300px] flex flex-col justify-center text-center p-6">
//               <CardContent>
//                 <BookOpen className="w-10 h-10 text-blue-600 mb-4 mx-auto" />
//                 <h4 className="text-xl font-semibold">{c.title}</h4>
//                 <p className="text-gray-600 mt-2">{c.desc}</p>
//                 <div className="flex justify-center items-center gap-2 text-yellow-500 mt-4">
//                   <Star className="w-5 h-5" />
//                   <span>{c.rating}</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         ))}
//       </motion.div>
//     </div>

//     {/* Navigation Arrows */}
//     <button
//       onClick={prevSlide}
//       className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md border rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
//     >
//       ←
//     </button>
//     <button
//       onClick={nextSlide}
//       className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md border rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-100"
//     >
//       →
//     </button>
//   </div>
// </motion.section>



//       {/* CTA Banner */}
//       <motion.section
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 text-center"
//       >
//         <h3 className="text-3xl font-bold mb-4">
//           Join with all the learners worldwide
//         </h3>
//         <p className="mb-6 text-lg">
//           Get mentorship, resources, and global opportunities today.
//         </p>
//         <button
//           onClick={() => setShowLogin(true)}
//           className="px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-gray-100 transition"
//         >
//           Get Started →
//         </button>
//       </motion.section>

//       <Footer />

//       {/* 🔑 Login Modal */}
//       <LoginModal
//         isOpen={showLogin}
//         onClose={() => setShowLogin(false)}
//         onSwitch={() => setShowLogin(false)}
//       />
//     </div>
//   );
// }


import { motion } from "framer-motion";
import {
  BookOpen,
  Star,
  Users,
  GraduationCap,
  MessageSquare,
  Award,
  Cpu,
  Palette,
  ShieldCheck,
  BarChart3,
  Cloud,
  Briefcase,
} from "lucide-react";


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Card, CardContent } from "../Components/Cards";
import Footer from "../Components/Footer";
import LoginModal from "../Modal/LoginModal";
import girlWithBook from "../assets/girl-with-book.png";

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");


  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else {
        setCardsPerView(3);
      }
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const courses = [
    {
      title: "Full-Stack Development",
      desc: "Master React, Node.js, and databases.",
      rating: 4.9,
      category: "Development",
      icon: BookOpen,
    },
    {
      title: "Data Science & AI",
      desc: "Hands-on Python, ML models, and AI tools.",
      rating: 4.8,
      category: "AI",
      icon: Cpu,
    },
    {
      title: "UI/UX Design",
      desc: "Design modern, user-friendly digital products.",
      rating: 4.7,
      category: "Design",
      icon: Palette,
    },
    {
      title: "Cybersecurity",
      desc: "Defend systems, networks, and applications.",
      rating: 4.6,
      category: "Security",
      icon: ShieldCheck,
    },
    {
      title: "Digital Marketing",
      desc: "SEO, social media, and analytics.",
      rating: 4.5,
      category: "Business",
      icon: BarChart3,
    },
    {
      title: "Cloud Computing",
      desc: "AWS, Azure, and Google Cloud fundamentals.",
      rating: 4.7,
      category: "Development",
      icon: Cloud,
    },
    {
      title: "Entrepreneurship",
      desc: "Build, launch, and scale your own startup.",
      rating: 4.8,
      category: "Business",
      icon: Briefcase,
    },
  ];

  const categories = ["All", "Development", "AI", "Design", "Security", "Business"];

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) => course.category === activeCategory)
  // Previous Slide
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? courses.length - cardsPerView : prev - 1
    );
  };

  // Next Slide
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= courses.length - cardsPerView ? 0 : prev + 1
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Navbar />
      {/*  Hero Section */}
      <section
        className="relative w-full text-white 
         "
      >
        <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center text-left  p-0 overflow-hidden min-h-[670px]
        ">

          <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between md:py-0  px-10 ">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative z-10 max-w-3xl px-6 md:py-0 py-10"
            >
              <h1 className="text-4xl sm:text-6xl font-bold leading-tight uppercase">
                Build Your Future <br /> With{" "}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                  EduBridge
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-200">
                Scholarships • Mentorship • Success Stories — all in one place.
                Learn, connect, and unlock opportunities worldwide.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row  gap-4">
                <button
                  onClick={() => setShowLogin(true)}
                  className="cursor-pointer px-6 py-3 rounded-lg bg-black text-white font-semibold shadow-md hover:bg-gray-800 transition"
                >
                  Get Started
                </button>
                <button
                  onClick={() => navigate("/scholarships")}
                  className="cursor-pointer px-6 py-3 rounded-lg bg-white text-black font-semibold shadow hover:bg-gray-100 transition"
                >
                  Browse Opportunities
                </button>
              </div>

              <div className="mt-10 flex  gap-8 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" /> 4 Learners
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" /> 5/5 Avg Rating
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative flex justify-center lg:justify-end w-full ml-0 md:mr-[-160px] mr-0 lg:ml-0 mt-6 lg:mt-0"
            >
              <img
                src={girlWithBook}
                alt="Hero"
                className="relative w-full h-auto md:h-[500px] lg:h-[670px] object-contain mx-auto"
              />

            </motion.div>

          </div>
        </div>
      </section>

      {/*  Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 bg-gray-50 px-6"
      >
        <h3 className="text-3xl font-bold text-center mb-12">
          Why Choose EduBridge?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: GraduationCap,
              title: "Scholarships",
              desc: "Curated global opportunities with deadlines & benefits.",
              color: "bg-blue-500 text-white",
            },
            {
              icon: MessageSquare,
              title: "Mentorship",
              desc: "Connect with seniors who secured scholarships abroad.",
              color: "bg-blue-500 text-white",
            },
            {
              icon: Award,
              title: "Success Stories",
              desc: "Get inspired from real students who made it happen.",
              color: "bg-blue-500 text-white",
            },

          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="wow fadeInUp"
            >
              <Card className="rounded-2xl bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex items-center gap-6">
                <div
                  className={`p-3 flex items-center justify-center rounded-full ${item.color}`}
                >
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>

              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>



      {/* Courses Slider Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        id="courses"
        className="py-20 px-6 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Top Picks For You
            </h3>

          </motion.div>

          {/* Category Tabs */}
          <div
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${activeCategory === category
                    ? "bg-blue-600 text-white "
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400 "
                    }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Course Cards Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, i) => (
              <motion.div
                key={i}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Card className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 h-full border-2 border-transparent hover:border-blue-200">
                  <CardContent className="p-8 flex flex-col items-center text-center h-full">
                    <div
                      className="mb-6 relative"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-blue-500  flex items-center justify-center ">
                        <course.icon className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    <h4 className="text-xl font-bold mb-3 text-gray-900 ">
                      {course.title}
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">{course.desc}</p>
                    {/* Rating */}

                    <div className="flex items-center gap-2 mt-auto">
                      <div className="flex items-center gap-1">
                        <div className="flex justify-center items-center gap-2 text-yellow-500 mt-6">
                          <div className="flex items-center gap-1">
                            <Star className="w-5 h-5" />
                            <span className="font-semibold text-gray-900">{course.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>



                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {/* {filteredCourses.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-gray-500 text-lg">No courses found in this category</p>
            </motion.div>
          )} */}
        </div>
      </motion.section >

      {/* CTA Banner */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 text-center"
      >
        <h3 className="text-3xl font-bold mb-4">
          Join with all the learners worldwide
        </h3>
        <p className="mb-6 text-lg">
          Get mentorship, resources, and global opportunities today.
        </p>
        <button
          onClick={() => setShowLogin(true)}
          className="cursor-pointer px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-gray-100 transition"
        >
          Get Started →
        </button>
      </motion.section>

      <Footer />

      {/* 🔑 Login Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitch={() => setShowLogin(false)}
      />
    </div>
  );
}
