// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   registerStudent,
//   registerMentor,
// } from "../services/authApi";

// const RegisterModal = ({ isOpen, onClose, onSwitch }) => {
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [accountType, setAccountType] = useState("student");
//   const [level, setLevel] = useState("");
//   const [occupation, setOccupation] = useState("");
//   const [organization, setOrganization] = useState("");
//   const [highestEducation, setHighestEducation] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const body =
//         accountType === "student"
//           ? { name: fullName, email, password, level }
//           : { name: fullName, email, password, occupation, organization, highestEducation };

//       const data =
//         accountType === "student"
//           ? await registerStudent(body)
//           : await registerMentor(body);

//       alert(data.message || "Account created! Check your email for verification.");
//       onClose();
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0, y: 30 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.9, opacity: 0, y: 30 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
//           >
//             <button
//               className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-700"
//               onClick={onClose}
//             >
//               ✕
//             </button>

//             <div className="text-center mb-6">
//               <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl font-bold shadow-md">
//                 🎓
//               </div>
//               <h1 className="text-2xl font-bold text-gray-900 mt-4">
//                 Create Account
//               </h1>
//               <p className="text-sm text-gray-500">
//                 Join EduBridge and unlock new opportunities
//               </p>
//             </div>

//             {error && (
//               <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
//             )}

//             <form className="space-y-5" onSubmit={handleSubmit}>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="John Doe"
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   placeholder="your.email@uni.edu"
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               {accountType === "student" && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Education Level
//                   </label>
//                   <select
//                     className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm transition"
//                     value={level}
//                     onChange={(e) => setLevel(e.target.value)}
//                     required
//                   >
//                     <option value="">Select level</option>
//                     <option value="High School">High School</option>
//                     <option value="College">College</option>
//                     <option value="University">University</option>
//                   </select>
//                 </div>
//               )}

//               {accountType === "mentor" && (
//                 <>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Occupation
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Software Engineer"
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm transition"
//                       value={occupation}
//                       onChange={(e) => setOccupation(e.target.value)}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Organization
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Google, University of XYZ..."
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm transition"
//                       value={organization}
//                       onChange={(e) => setOrganization(e.target.value)}
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Highest Education
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Master's in Computer Science"
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm transition"
//                       value={highestEducation}
//                       onChange={(e) => setHighestEducation(e.target.value)}
//                     />
//                   </div>
//                 </>
//               )}

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Account Type
//                 </label>
//                 <div className="flex items-center gap-6 mt-2">
//                   <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="accountType"
//                       value="student"
//                       checked={accountType === "student"}
//                       onChange={() => setAccountType("student")}
//                       className="text-indigo-600 focus:ring-indigo-500"
//                     />
//                     Student
//                   </label>
//                   <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="accountType"
//                       value="mentor"
//                       checked={accountType === "mentor"}
//                       onChange={() => setAccountType("mentor")}
//                       className="text-indigo-600 focus:ring-indigo-500"
//                     />
//                     Mentor
//                   </label>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="cursor-pointer w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:opacity-90 transition"
//               >
//                 {loading ? "Creating..." : "Create Account"}
//               </button>
//             </form>

//             <p className="text-sm text-gray-600 mt-6 text-center">
//               Already have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => {
//                   onClose();
//                   onSwitch && onSwitch("login");
//                 }}
//                 className="cursor-pointer text-indigo-600 font-medium hover:underline"
//               >
//                 Sign in here
//               </button>
//             </p>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default RegisterModal;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { registerStudent, registerMentor } from "../services/authApi";

// const RegisterModal = ({ isOpen, onClose, onSwitch }) => {
//   const navigate = useNavigate();

//   // Common fields
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [accountType, setAccountType] = useState("student");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Student fields
//   const [level, setLevel] = useState("");
//   const [institution, setInstitution] = useState("");
//   const [fieldOfStudy, setFieldOfStudy] = useState("");
//   const [gpa, setGpa] = useState("");
//   const [interests, setInterests] = useState("");
//   const [preferredStudyDestinations, setPreferredStudyDestinations] = useState("");
//   const [careerGoals, setCareerGoals] = useState("");

//   // Mentor fields
//   const [occupation, setOccupation] = useState("");
//   const [organization, setOrganization] = useState("");
//   const [highestEducation, setHighestEducation] = useState("");
//   const [yearsOfExperience, setYearsOfExperience] = useState("");
//   const [expertise, setExpertise] = useState("");
//   const [whyMentor, setWhyMentor] = useState("");
//   const [mentorAreas, setMentorAreas] = useState("");
//   const [availability, setAvailability] = useState("");
//   const [format, setFormat] = useState("Online");
//   const [languages, setLanguages] = useState("");
//   const [linkedin, setLinkedin] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       let data;

//       if (accountType === "student") {
//         const body = {
//           name: fullName,
//           email,
//           password,
//           level,
//           institution,
//           fieldOfStudy,
//           gpa,
//           interests: interests.split(",").map((i) => i.trim()).filter(Boolean),
//           preferredStudyDestinations: preferredStudyDestinations
//             .split(",")
//             .map((d) => d.trim())
//             .filter(Boolean),
//           careerGoals,
//         };
//         data = await registerStudent(body);
//       } else {
//         const body = {
//           name: fullName,
//           email,
//           password,
//           occupation,
//           organization,
//           highestEducation,
//           yearsOfExperience,
//           expertise: expertise.split(",").map((e) => e.trim()).filter(Boolean),
//           mentorAreas: mentorAreas.split(",").map((m) => m.trim()).filter(Boolean),
//           whyMentor,
//           availability,
//           format,
//           languages: languages.split(",").map((l) => l.trim()).filter(Boolean),
//           linkedin,
//         };
//         data = await registerMentor(body);
//       }

//       alert(data.message || "Account created! Check your email for verification.");
//       onClose();
//       navigate("/");
//     } catch (err) {
//       setError(err.message || "Registration failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0, y: 30 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.9, opacity: 0, y: 30 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-10 relative overflow-y-auto max-h-[90vh] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
//           >
//             <button
//               className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-700"
//               onClick={onClose}
//             >
//               ✕
//             </button>

//             <div className="text-center mb-6">
//               <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl font-bold shadow-md">
//                 🎓
//               </div>
//               <h1 className="text-2xl font-bold text-gray-900 mt-4">Create Account</h1>
//               <p className="text-sm text-gray-500">Join EduBridge and unlock new opportunities</p>
//             </div>

//             {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

//             <form className="space-y-3" onSubmit={handleSubmit}>
//               {/* Common Fields */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   required
//                 />

//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <input
//                 type="password"
//                 placeholder="Password"
//                 className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />

//               {/* ===== Student Fields ===== */}
//               {accountType === "student" && (
//                 <>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <select
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                       value={level}
//                       onChange={(e) => setLevel(e.target.value)}
//                       required
//                     >
//                       <option value="">Select Education Level</option>
//                       <option value="High School">High School</option>
//                       <option value="College">College</option>
//                       <option value="University">University</option>
//                     </select>

//                     <input
//                       type="text"
//                       placeholder="Institution Name"
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                       value={institution}
//                       onChange={(e) => setInstitution(e.target.value)}
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input
//                       type="text"
//                       placeholder="Field of Study"
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                       value={fieldOfStudy}
//                       onChange={(e) => setFieldOfStudy(e.target.value)}
//                     />

//                     <input
//                       type="text"
//                       placeholder="GPA (optional)"
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                       value={gpa}
//                       onChange={(e) => setGpa(e.target.value)}
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input
//                       type="text"
//                       placeholder="Interests (e.g. AI, Web Dev)"
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                       value={interests}
//                       onChange={(e) => setInterests(e.target.value)}
//                     />

//                     <input
//                       type="text"
//                       placeholder="Preferred Study Destinations (e.g. USA, UK)"
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                       value={preferredStudyDestinations}
//                       onChange={(e) => setPreferredStudyDestinations(e.target.value)}
//                     />
//                   </div>

//                   <textarea
//                     placeholder="Career Goals"
//                     className="w-full px-4 py-2.5 min-h-[100px] rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                     value={careerGoals}
//                     onChange={(e) => setCareerGoals(e.target.value)}
//                   />
//                 </>
//               )}

//               {/* ===== Mentor Fields ===== */}
//               {accountType === "mentor" && (
//                 <>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input
//                       type="text"
//                       placeholder="Occupation"
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                       value={occupation}
//                       onChange={(e) => setOccupation(e.target.value)}
//                       required
//                     />
//                     <input
//                       type="text"
//                       placeholder="Organization"
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                       value={organization}
//                       onChange={(e) => setOrganization(e.target.value)}
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input
//                       type="text"
//                       placeholder="Highest Education"
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                       value={highestEducation}
//                       onChange={(e) => setHighestEducation(e.target.value)}
//                     />
//                     <input
//                       type="number"
//                       placeholder="Years of Experience"
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                       value={yearsOfExperience}
//                       onChange={(e) => setYearsOfExperience(e.target.value)}
//                     />
//                   </div>

//                   {/* Expertise + Mentor Areas */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input
//                       type="text"
//                       placeholder="Expertise (e.g. React, Data Science)"
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                       value={expertise}
//                       onChange={(e) => setExpertise(e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Mentor Areas (e.g. Career Advice, Frontend)"
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                       value={mentorAreas}
//                       onChange={(e) => setMentorAreas(e.target.value)}
//                     />
//                   </div>

//                   <textarea
//                     placeholder="Why do you want to mentor?"
//                     className="w-full px-4 py-2 min-h-[60px] rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                     value={whyMentor}
//                     onChange={(e) => setWhyMentor(e.target.value)}
//                   />

//                   {/* Availability + Format */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input
//                       type="text"
//                       placeholder="Availability (e.g. Weekends, Evenings)"
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                       value={availability}
//                       onChange={(e) => setAvailability(e.target.value)}
//                     />
//                     <select
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                       value={format}
//                       onChange={(e) => setFormat(e.target.value)}
//                     >
//                       <option value="Online">Online</option>
//                       <option value="In-person">In-person</option>
//                       <option value="Both">Both</option>
//                     </select>
//                   </div>

//                   {/* Languages + LinkedIn */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input
//                       type="text"
//                       placeholder="Languages (e.g. English, Urdu)"
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                       value={languages}
//                       onChange={(e) => setLanguages(e.target.value)}
//                     />
//                     <input
//                       type="url"
//                       placeholder="LinkedIn Profile URL"
//                       className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
//                       value={linkedin}
//                       onChange={(e) => setLinkedin(e.target.value)}
//                     />
//                   </div>
//                 </>
//               )}

//               {/* Account Type Switch */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
//                 <div className="flex items-center gap-6 mt-2">
//                   <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="accountType"
//                       value="student"
//                       checked={accountType === "student"}
//                       onChange={() => setAccountType("student")}
//                       className="text-indigo-600 focus:ring-indigo-500"
//                     />
//                     Student
//                   </label>
//                   <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="accountType"
//                       value="mentor"
//                       checked={accountType === "mentor"}
//                       onChange={() => setAccountType("mentor")}
//                       className="text-indigo-600 focus:ring-indigo-500"
//                     />
//                     Mentor
//                   </label>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="cursor-pointer w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:opacity-90 transition"
//               >
//                 {loading ? "Creating..." : "Create Account"}
//               </button>
//             </form>

//             <p className="text-sm text-gray-600 mt-4 text-center">
//               Already have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => {
//                   onClose();
//                   onSwitch && onSwitch("login");
//                 }}
//                 className="cursor-pointer text-indigo-600 font-medium hover:underline"
//               >
//                 Sign in here
//               </button>
//             </p>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default RegisterModal;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { registerStudent, registerMentor } from "../services/authApi";

const RegisterModal = ({ isOpen, onClose, onSwitch }) => {
  const navigate = useNavigate();

  // Common fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [accountType, setAccountType] = useState("student");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Student fields
  const [level, setLevel] = useState("");
  const [institution, setInstitution] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [gpa, setGpa] = useState("");
  const [interests, setInterests] = useState("");
  const [preferredStudyDestinations, setPreferredStudyDestinations] =
    useState("");
  const [careerGoals, setCareerGoals] = useState("");
  const [studentIdUrl, setStudentIdUrl] = useState("");

  // Mentor fields
  const [occupation, setOccupation] = useState("");
  const [organization, setOrganization] = useState("");
  const [highestEducation, setHighestEducation] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [expertise, setExpertise] = useState("");
  const [whyMentor, setWhyMentor] = useState("");
  const [mentorAreas, setMentorAreas] = useState("");
  const [availability, setAvailability] = useState("");
  const [format, setFormat] = useState("Online");
  const [languages, setLanguages] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [references, setReferences] = useState("");
  const [idDocumentUrl, setIdDocumentUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let data;

      if (accountType === "student") {
        const body = {
          name: fullName,
          email,
          password,
          phone,
          dob,
          gender,
          level,
          institution,
          fieldOfStudy,
          gpa,
          interests: interests.split(",").map((i) => i.trim()).filter(Boolean),
          preferredStudyDestinations: preferredStudyDestinations
            .split(",")
            .map((d) => d.trim())
            .filter(Boolean),
          careerGoals,
          studentIdUrl,
          termsAccepted,
        };
        data = await registerStudent(body);
      } else {
        const body = {
          name: fullName,
          email,
          password,
          phone,
          dob,
          gender,
          occupation,
          organization,
          highestEducation,
          yearsOfExperience,
          expertise: expertise.split(",").map((e) => e.trim()).filter(Boolean),
          mentorAreas: mentorAreas
            .split(",")
            .map((m) => m.trim())
            .filter(Boolean),
          whyMentor,
          availability,
          format,
          languages: languages.split(",").map((l) => l.trim()).filter(Boolean),
          linkedin,
          resumeUrl,
          references,
          idDocumentUrl,
          termsAccepted,
        };
        data = await registerMentor(body);
      }

      alert(data.message || "Account created! Check your email for verification.");
      onClose();
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-10 relative overflow-y-auto max-h-[90vh] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            <button
              className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={onClose}
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl font-bold shadow-md">
                🎓
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mt-4">
                Create Account
              </h1>
              <p className="text-sm text-gray-500">
                Join EduBridge and unlock new opportunities
              </p>
            </div>

            {error && (
              <div className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 px-4 py-2 rounded-lg text-center">
                {error}
              </div>
            )}

            <form className="space-y-3" onSubmit={handleSubmit}>
              {/* Common Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                <select
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* ===== STUDENT FIELDS ===== */}
              {accountType === "student" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      required
                    >
                      <option value="">Select Education Level</option>
                      <option value="High School">High School</option>
                      <option value="College">College</option>
                      <option value="University">University</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Institution Name"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Field of Study"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={fieldOfStudy}
                      onChange={(e) => setFieldOfStudy(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="GPA (optional)"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={gpa}
                      onChange={(e) => setGpa(e.target.value)}
                    />
                  </div>

                  <input
                    type="url"
                    placeholder="Student ID Document URL"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                    value={studentIdUrl}
                    onChange={(e) => setStudentIdUrl(e.target.value)}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Interests (e.g. AI, Web Dev)"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={interests}
                      onChange={(e) => setInterests(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Preferred Study Destinations (e.g. USA, UK)"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={preferredStudyDestinations}
                      onChange={(e) => setPreferredStudyDestinations(e.target.value)}
                    />
                  </div>

                  <textarea
                    placeholder="Career Goals"
                    className="w-full px-4 py-2.5 min-h-[100px] rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                    value={careerGoals}
                    onChange={(e) => setCareerGoals(e.target.value)}
                  />
                </>
              )}

              {/* ===== MENTOR FIELDS ===== */}
              {accountType === "mentor" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Occupation"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value)}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Organization"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Highest Education"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={highestEducation}
                      onChange={(e) => setHighestEducation(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Years of Experience"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={yearsOfExperience}
                      onChange={(e) => setYearsOfExperience(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Expertise (e.g. React, Data Science)"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={expertise}
                      onChange={(e) => setExpertise(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Mentor Areas (e.g. Career Advice, Frontend)"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={mentorAreas}
                      onChange={(e) => setMentorAreas(e.target.value)}
                    />
                  </div>

                  <textarea
                    placeholder="Why do you want to mentor?"
                    className="w-full px-4 py-2 min-h-[60px] rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                    value={whyMentor}
                    onChange={(e) => setWhyMentor(e.target.value)}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Availability (e.g. Weekends, Evenings)"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                    />
                    <select
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={format}
                      onChange={(e) => setFormat(e.target.value)}
                    >
                      <option value="Online">Online</option>
                      <option value="In-person">In-person</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Languages (e.g. English, Urdu)"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={languages}
                      onChange={(e) => setLanguages(e.target.value)}
                    />
                    <input
                      type="url"
                      placeholder="LinkedIn Profile URL"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="url"
                      placeholder="Resume URL"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={resumeUrl}
                      onChange={(e) => setResumeUrl(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="References"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={references}
                      onChange={(e) => setReferences(e.target.value)}
                    />
                    <input
                      type="url"
                      placeholder="ID Document URL"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                      value={idDocumentUrl}
                      onChange={(e) => setIdDocumentUrl(e.target.value)}
                    />
                  </div>
                </>
              )}

              {/* Account Type Switch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Type
                </label>
                <div className="flex items-center gap-6 mt-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="accountType"
                      value="student"
                      checked={accountType === "student"}
                      onChange={() => setAccountType("student")}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    Student
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="accountType"
                      value="mentor"
                      checked={accountType === "mentor"}
                      onChange={() => setAccountType("mentor")}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    Mentor
                  </label>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300"
                  required
                />
                <label className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="text-indigo-600 font-medium hover:underline"
                  >
                    Terms & Conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:opacity-90 transition"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            <p className="text-sm text-gray-600 mt-4 text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitch && onSwitch("login");
                }}
                className="cursor-pointer text-indigo-600 font-medium hover:underline"
              >
                Sign in here
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegisterModal;
