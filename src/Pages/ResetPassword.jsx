import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { resetPassword } from "../services/authApi";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Extract token from query param
    const token = new URLSearchParams(location.search).get("token");

    useEffect(() => {
        if (!token) {
            setError("Invalid or missing reset token.");
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!newPassword || !confirmPassword) {
            return setError("Please fill in all fields.");
        }
        if (newPassword.length < 6) {
            return setError("Password must be at least 6 characters long.");
        }
        if (newPassword !== confirmPassword) {
            return setError("Passwords do not match.");
        }

        setLoading(true);
        try {
            const res = await resetPassword(token, newPassword);
            setMessage(res.message || "Password reset successful! You can now log in.");
            setNewPassword("");
            setConfirmPassword("");

            // Redirect to login after 2.5s
            setTimeout(() => navigate("/"), 2500);
        } catch (err) {
            console.error("Reset Password Error:", err);
            setError(err.response?.data?.message || err.message || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <div className="flex flex-1 items-center justify-center px-4 py-12">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <div className="text-center mb-6">
                        <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl font-bold shadow-md">
                            🔒
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mt-4">
                            Reset Password
                        </h1>
                        <p className="text-sm text-gray-500">
                            Enter your new password below.
                        </p>
                    </div>

                    {message && (
                        <p className="text-green-600 text-sm bg-green-50 border border-green-200 px-3 py-2 rounded-lg mb-4 text-center">
                            {message}
                        </p>
                    )}
                    {error && (
                        <p className="text-red-500 text-sm bg-red-50 border border-red-200 px-3 py-2 rounded-lg mb-4 text-center">
                            {error}
                        </p>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="cursor-pointer w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:opacity-90 transition disabled:opacity-60"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
