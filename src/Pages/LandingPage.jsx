import { motion } from "framer-motion";
import { BookOpen, Star, Users } from "lucide-react";
import Navbar from "../Components/Navbar";         
import Button from "../Components/Button";
import { Card, CardContent } from "../Components/Cards";

export default function LandingPage() {
  const courses = [
    { title: "Full-Stack Development", desc: "Master React, Node.js, and databases.", rating: 4.9 },
    { title: "Data Science & AI", desc: "Hands-on Python, ML models, and AI tools.", rating: 4.8 },
    { title: "UI/UX Design", desc: "Design modern, user-friendly digital products.", rating: 4.7 },
  ];

  return (
    <div className="bg-white text-gray-900">
      <Navbar />

      {/* Hero Section */}
<section className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
  {/* ✅ Text Column (60%) */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="w-full md:w-3/5 space-y-6"
  >
    <h2 className="text-5xl font-extrabold leading-tight">
      Learn Without Limits.
    </h2>
    <p className="text-lg text-gray-600">
      Upskill yourself with world-class courses from industry experts.
      Build real projects, earn certificates, and join a global learning community.
    </p>
    <div className="space-x-4">
      <Button size="lg">Get Started</Button>
      <Button variant="outline" size="lg">Browse Courses</Button>
    </div>
    <div className="flex gap-6 pt-6 text-sm text-gray-600">
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-blue-600" /> 50k+ Learners
      </div>
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-500" /> 4.8/5 Avg Rating
      </div>
    </div>
  </motion.div>

  {/* ✅ Image Column (40%) */}
  <motion.img
    initial={{ opacity: 0, x: 60 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1 }}
    src="https://www.newmetrics.net/files/uploads/2023/08/Student-Experience-Cover-2-1536x613.jpg"
    alt="Learning"
    className="w-full md:w-2/5 rounded-2xl shadow-xl"
  />
</section>


      {/* Courses Section */}
      <section id="courses" className="py-20 bg-gray-50 px-6">
        <h3 className="text-3xl font-bold text-center mb-12">Top Picks For You</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {courses.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Card className="rounded-xl hover:shadow-lg transition">
                <CardContent>
                  <BookOpen className="w-10 h-10 text-blue-600 mb-4" />
                  <h4 className="text-xl font-semibold">{c.title}</h4>
                  <p className="text-gray-600 mt-2">{c.desc}</p>
                  <div className="flex items-center gap-2 text-yellow-500 mt-4">
                    <Star className="w-5 h-5" />
                    <span>{c.rating}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-sm py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">
          <p>© {new Date().getFullYear()} EduBridge. All rights reserved.</p>
          <div className="space-x-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
