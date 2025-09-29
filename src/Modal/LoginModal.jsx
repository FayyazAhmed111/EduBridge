import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose, onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // fake demo accounts
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
      onClose(); // ✅ close modal on success
    } else {
      setError("Invalid email or password");
    }
  };

  if (!isOpen) return null; // ✅ modal hidden

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

        {/* Error */}
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="your.email@uni.edu"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md text-sm font-semibold hover:bg-gray-900"
          >
            Sign In
          </button>
        </form>

        {/* Links */}
        <div className="flex justify-between text-sm text-gray-600 mt-3">
          <a href="/forgetpassword" className="hover:underline">
            Forgot Password?
          </a>
          <button
            type="button"
            onClick={() => {
              onClose();
              onSwitch && onSwitch("register"); // ✅ switch to register modal
            }}
            className="text-blue-600 hover:underline"
          >
            Don’t have an account? Register
          </button>
        </div>

        {/* Demo Accounts */}
        <div className="bg-gray-100 rounded-md p-3 mt-5 text-xs text-gray-600">
          <p className="font-medium mb-1">Demo accounts:</p>
          <p>Student: student@uni.edu</p>
          <p>Mentor: mentor@uni.edu</p>
          <p>Admin: admin@uni.edu</p>
          <p>Password: any</p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
