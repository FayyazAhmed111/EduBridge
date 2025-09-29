import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterModal = ({ isOpen, onClose, onSwitch }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("student");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ store fake registration in localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", fullName);
    localStorage.setItem("accountType", accountType);

    onClose(); // close modal
    navigate("/dashboard"); // redirect after register
  };

  if (!isOpen) return null; // hidden until opened

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Logo & Title */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422A12.083 12.083 0 0118 20.5 12.083 12.083 0 0112 22a12.083 12.083 0 01-6-1.5 12.083 12.083 0 01-.16-9.922L12 14z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Edu Bridge</h1>
          <p className="text-sm text-gray-500">
            Your gateway to international education opportunities
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="your.email@uni.edu"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Account Type</label>
            <div className="space-y-2">
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="radio"
                  name="accountType"
                  value="student"
                  checked={accountType === "student"}
                  onChange={() => setAccountType("student")}
                  className="mr-2"
                />
                Student
              </label>
              <label className="flex items-center text-sm text-gray-700">
                <input
                  type="radio"
                  name="accountType"
                  value="mentor"
                  checked={accountType === "mentor"}
                  onChange={() => setAccountType("mentor")}
                  className="mr-2"
                />
                Mentor (requires admin approval)
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md text-sm font-semibold hover:bg-gray-900"
          >
            Create Account
          </button>
        </form>

        {/* Sign In link */}
        <p className="text-sm text-gray-600 mt-4 text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              onClose();
              onSwitch && onSwitch("login"); // ✅ switch to login modal
            }}
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
