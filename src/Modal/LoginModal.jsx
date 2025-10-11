import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { login, resendVerification } from "../services/authApi";
import axios from "axios";

const LoginModal = ({ isOpen, onClose, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResendMessage("");
    setLoading(true);

    if (!email || !password) {
      setError("⚠️ Please enter both email and password");
      setLoading(false);
      return;
    }

    try {
      const data = await login(email, password);

      // Save tokens and user info in localStorage
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("isLoggedIn", "true");

      onClose();
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Login failed";

      if (msg.includes("pending approval")) {
        setError("Your mentor account is pending admin approval. Please wait for confirmation.");
      } else if (msg.includes("rejected")) {
        setError("Your mentor account was rejected by the admin. Contact support for help.");
      } else if (msg.includes("suspended")) {
        setError("Your account is temporarily suspended due to multiple failed attempts. Try later or reset your password.");
      } else if (msg.toLowerCase().includes("verify")) {
        setError("Please verify your email before logging in.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
  if (!email) {
    setError("Please enter your email first to resend verification.");
    return;
  }
  setResending(true);
  setResendMessage("");
  try {
    await resendVerification(email);
    setResendMessage("Verification email has been resent! Please check your inbox.");
  } catch (err) {
    setResendMessage("Failed to resend verification email. Try again later.");
  } finally {
    setResending(false);
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
            {/* Close Button */}
            <button
              className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={onClose}
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl font-bold shadow-md">
                🎓
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mt-4">
                Welcome Back
              </h1>
              <p className="text-sm text-gray-500">
                Sign in to continue your EduBridge journey
              </p>
            </div>

            {/* Error + Resend Section */}
            {error && (
              <motion.div
                className="text-red-600 text-sm mb-4 bg-red-50 border border-red-200 px-4 py-2 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}

                {error.toLowerCase().includes("verify") && (
                  <div className="mt-2">
                    <button
                      onClick={handleResendVerification}
                      disabled={resending}
                      className="text-indigo-600 font-medium hover:underline disabled:opacity-50"
                    >
                      {resending ? "Sending..." : "Click here to resend verification email"}
                    </button>
                    {resendMessage && (
                      <p className="mt-2 text-green-600 text-xs">
                        {resendMessage}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:opacity-90 transition"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Footer Links */}
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
                className="cursor-pointer text-indigo-600 hover:underline font-medium"
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
