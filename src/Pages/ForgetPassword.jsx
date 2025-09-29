import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import LoginModal from "../Modal/LoginModal";
import RegisterModal from "../Modal/RegisterModal";

const ForgetPassword = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // 🔄 handle modal switching
  const handleSwitch = (target) => {
    if (target === "login") {
      setShowRegister(false);
      setShowLogin(true);
    }
    if (target === "register") {
      setShowLogin(false);
      setShowRegister(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ✅ Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl font-bold shadow-md">
              🎓
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">
              Edu Bridge
            </h1>
            <p className="text-sm text-gray-500">
              Your gateway to international education opportunities
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Forgot Password?
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Enter your registered email and we’ll send you a reset link.
            </p>

            {/* Form */}
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your.email@uni.edu"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:opacity-90 transition"
              >
                Send Reset Link
              </button>
            </form>

            {/* Back to Sign In */}
            <p className="text-sm text-gray-600 mt-6 text-center">
              Remember your password?{" "}
              <button
                onClick={() => setShowLogin(true)}
                className="text-indigo-600 font-medium hover:underline"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitch={handleSwitch}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitch={handleSwitch}
      />
    </div>
  );
};

export default ForgetPassword;
