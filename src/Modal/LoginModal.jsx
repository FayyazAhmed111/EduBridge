import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const LoginModal = ({ isOpen, onClose, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // demo accounts
  const demoAccounts = {
    "student@uni.edu": "any",
    "mentor@uni.edu": "any",
    "admin@uni.edu": "any",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (demoAccounts[email] && password) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      navigate("/dashboard");
      onClose();
    } else {
      setError("⚠️ Invalid email or password");
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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={onClose}
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl font-bold shadow-md">
                🎓
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mt-4">Welcome Back</h1>
              <p className="text-sm text-gray-500">
                Sign in to continue your EduBridge journey
              </p>
            </div>

            {error && (
              <motion.div
                className="text-red-500 text-sm mb-3 bg-red-50 border border-red-200 px-3 py-2 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit}>
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
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:opacity-90 transition"
              >
                Sign In
              </button>
            </form>

            <div className="flex justify-between text-sm text-gray-600 mt-5">
              <button
                type="button"
                onClick={() => navigate("/forgetpassword")}
                className="hover:text-indigo-600 transition"
              >
                Forgot Password?
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSwitch && onSwitch("register");
                }}
                className="text-indigo-600 hover:underline font-medium"
              >
                Create an account
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
