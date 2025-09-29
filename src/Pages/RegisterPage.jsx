// import React from "react";
// import { Link } from "react-router-dom";

// const Register = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white">
//       <div className="w-full max-w-sm">
//         {/* Logo & Title */}
//         <div className="text-center mb-6">
//           <div className="flex items-center justify-center mb-2">
//             {/* Graduation Cap Icon */}
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-10 w-10 text-black"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path d="M12 14l9-5-9-5-9 5 9 5z" />
//               <path d="M12 14l6.16-3.422A12.083 12.083 0 0118 20.5 12.083 12.083 0 0112 22a12.083 12.083 0 01-6-1.5 12.083 12.083 0 01-.16-9.922L12 14z" />
//             </svg>
//           </div>
//           <h1 className="text-xl font-semibold text-gray-900">Edu Bridge</h1>
//           <p className="text-sm text-gray-500">
//             Your gateway to international education opportunities
//           </p>
//         </div>

//         {/* Card */}
//         <div className="bg-white shadow rounded-xl border border-gray-200 p-6">
//           <h2 className="text-base font-semibold text-gray-800 mb-1">
//             Join Edu Bridge
//           </h2>
//           <p className="text-sm text-gray-500 mb-4">
//             Create your account to connect with mentors and opportunities
//           </p>

//           {/* Form */}
//           <form className="space-y-4">
//             {/* Full Name */}
//             <div>
//               <label className="block text-sm text-gray-700 mb-1">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="John Doe"
//                 className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-sm text-gray-700 mb-1">Email</label>
//               <input
//                 type="email"
//                 placeholder="your.email@uni.edu"
//                 className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//               />
//             </div>

//             {/* Account Type */}
//             <div>
//               <label className="block text-sm text-gray-700 mb-1">
//                 Account Type
//               </label>
//               <div className="space-y-2">
//                 <label className="flex items-center text-sm text-gray-700">
//                   <input
//                     type="radio"
//                     name="accountType"
//                     className="mr-2"
//                     defaultChecked
//                   />
//                   Student
//                 </label>
//                 <label className="flex items-center text-sm text-gray-700">
//                   <input type="radio" name="accountType" className="mr-2" />
//                   Mentor (requires admin approval)
//                 </label>
//               </div>
//             </div>

//             {/* Button */}

//             <Link to="/dashboard">
//             <button
//               type="submit"
//               className="w-full bg-black text-white py-2 rounded-md text-sm font-semibold hover:bg-gray-900"
//             >
//               Create Account
//             </button>
//             </Link>
//           </form>

//           {/* Sign In link */}
//           <p className="text-sm text-gray-600 mt-4 text-center">
//             Already have an account?{" "}
//             <Link to="/" className="text-black font-medium hover:underline">
//               Sign in here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountType: "student",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // ✅ If validation passes
    localStorage.setItem("isRegistered", "true");
    localStorage.setItem("userEmail", email);

    navigate("/dashboard"); // Navigate programmatically
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
        {/* Logo & Title */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 sm:h-12 sm:w-12 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422A12.083 12.083 0 0118 20.5 12.083 12.083 0 0112 22a12.083 12.083 0 01-6-1.5 12.083 12.083 0 01-.16-9.922L12 14z" />
            </svg>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Edu Bridge
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Your gateway to international education opportunities
          </p>
        </div>

        {/* Card */}
        <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
            Join Edu Bridge
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mb-4">
            Create your account to connect with mentors and opportunities
          </p>

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm sm:text-base text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="your.email@uni.edu"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm sm:text-base text-gray-700 mb-1">
                Account Type
              </label>
              <div className="space-y-2">
                <label className="flex items-center text-sm sm:text-base text-gray-700">
                  <input
                    type="radio"
                    name="accountType"
                    value="student"
                    checked={formData.accountType === "student"}
                    onChange={handleChange}
                    className="mr-2 accent-indigo-600"
                  />
                  Student
                </label>
                <label className="flex items-center text-sm sm:text-base text-gray-700">
                  <input
                    type="radio"
                    name="accountType"
                    value="mentor"
                    checked={formData.accountType === "mentor"}
                    onChange={handleChange}
                    className="mr-2 accent-indigo-600"
                  />
                  Mentor (requires admin approval)
                </label>
              </div>
            </div>

            {/* ✅ Button with validation */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 sm:py-2.5 rounded-md text-sm sm:text-base font-semibold hover:bg-gray-900 transition"
            >
              Create Account
            </button>
          </form>

          <p className="text-sm sm:text-base text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-black font-medium hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
