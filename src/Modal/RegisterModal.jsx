import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const RegisterModal = ({ isOpen, onClose, onSwitch }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("student");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // fake registration in localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", fullName);
    localStorage.setItem("accountType", accountType);

    onClose();
    navigate("/dashboard");
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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={onClose}
            >
              ✕
            </button>

            {/* Logo + Title */}
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

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your.email@uni.edu"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

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

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:opacity-90 transition"
              >
                Create Account
              </button>
            </form>

            {/* Switch to Login */}
            <p className="text-sm text-gray-600 mt-6 text-center">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitch && onSwitch("login");
                }}
                className="text-indigo-600 font-medium hover:underline"
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
