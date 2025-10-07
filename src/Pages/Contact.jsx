// import React, { useState } from "react";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Feedback Submitted:", formData);
//     setSubmitted(true);
//     setFormData({ name: "", email: "", message: "" });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* ✅ Navbar */}
//       <Navbar />

//       {/* ✅ Hero Section */}
//       <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-14 px-6 text-center">
//         <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Contact Us</h1>
//         <p className="max-w-2xl mx-auto text-sm sm:text-base text-blue-100">
//           Have feedback or questions? We’d love to hear from you!
//         </p>
//       </section>

//       {/* ✅ Contact Form Section */}
//       <main className="flex-1 flex items-center justify-center px-6 py-12">
//         <div className="w-full max-w-lg">
//           {submitted && (
//             <div className="bg-green-100 text-green-700 text-center py-2 rounded mb-6">
//               ✅ Your message has been sent successfully!
//             </div>
//           )}

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-lg transition"
//           >
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
//                 placeholder="Your Name"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
//                 placeholder="you@example.com"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Message
//               </label>
//               <textarea
//                 name="message"
//                 required
//                 value={formData.message}
//                 onChange={handleChange}
//                 rows="4"
//                 className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
//                 placeholder="Write your message here..."
//               ></textarea>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default ContactPage;



import { useState } from "react"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { Mail, User, MessageSquare, Send, CheckCircle } from "lucide-react"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Feedback Submitted:", formData)
    setSubmitted(true)
    setFormData({ name: "", email: "", message: "" })

    // Hide success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r text-center from-blue-600 via-indigo-600 to-blue-600 text-white py-20 px-6 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto">

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">Contact Us</h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-blue-100 leading-relaxed">
            Have feedback or questions? We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          {/* Success Message */}
          {submitted && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl mb-8 shadow-lg flex items-center gap-3 animate-in slide-in-from-top duration-300">
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <span className="font-medium">Your message has been sent successfully!</span>
            </div>
          )}

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"></div>

            <div className="relative z-10">
              <div className="text-center mb-8">

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Send us a message</h2>
                <p className="text-gray-600">We'll get back to you as soon as possible</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <div className="relative">

                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl pl-5 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm sm:text-base"
                      placeholder="Your Name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <div className="relative">

                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl pl-5 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm sm:text-base"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <div className="relative">
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className="w-full border-2 border-gray-200 rounded-xl pl-4 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm sm:text-base resize-none"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full cursor-pointer  bg-blue-500 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>Submit</span>
                </button>
              </form>
            </div>
          </div>


        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ContactPage
