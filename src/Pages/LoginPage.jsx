import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Demo accounts
  const demoAccounts = {
    "student@uni.edu": "any",
    "mentor@uni.edu": "any",
    "admin@uni.edu": "any",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (demoAccounts[email] && password) {
      // ✅ Store login info
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);

      // ✅ Redirect to dashboard
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-sm">
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

        {/* Card */}
        <div className="bg-white shadow rounded-xl border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-1">
            Sign In to Edu Bridge
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Enter your credentials to access the platform
          </p>

          {/* Error */}
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="your.email@uni.edu"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* ✅ No Link — let form handle navigation */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md text-sm font-semibold hover:bg-gray-900"
            >
              Sign In
            </button>
          </form>

          {/* Links */}
          <div className="flex justify-between text-sm text-gray-600 mt-3">
           <Link to="/forgot-password" className="hover:underline">
  Forgot Password?
</Link>

            <Link to="/register" className="hover:underline">
              Don’t have an account? Register here
            </Link>
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
    </div>
  );
};

export default Login;
