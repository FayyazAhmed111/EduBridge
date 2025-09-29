import React from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-sm">
        {/* Logo & Title */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-2">
            {/* Graduation Cap Icon */}
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
            Forgot Password?
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Enter your registered email to reset your password
          </p>

          {/* Form */}
          <form className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="your.email@uni.edu"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md text-sm font-semibold hover:bg-gray-900"
            >
              Send Reset Link
            </button>
          </form>

          {/* Back to Sign In */}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Remember your password?{" "}
            <Link to="/" className="text-black font-medium hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
