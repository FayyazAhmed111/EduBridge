import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, LogIn } from "lucide-react";
import axios from "axios";
import Config from "../../Constants/Config";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1️⃣ Login request
      const res = await axios.post(`http://localhost:5000/api/auth/login`, {
        email: form.email,
        password: form.password,
      });
      console.log("res", res);

      const { accessToken } = res.data;
      if (!accessToken) throw new Error("No token received");

      // 2️⃣ Store token
      localStorage.setItem("accessToken", accessToken);

      // 3️⃣ Verify role
      const verifyRes = await axios.get(`${Config.API_BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const role = verifyRes.data?.user.role;
      console.log("role: ", role);
      if (role !== "admin") {
        setError("Access denied. Admins only.");
        localStorage.removeItem("accessToken");
        return;
      }

      // 4️⃣ Success → Save role and redirect
      localStorage.setItem("userRole", role);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Admin login error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Invalid credentials or network error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex-1 flex justify-center items-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40"></div>

          <div className="relative z-10">
            <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
              Admin Login
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full border-2 border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
              >
                <LogIn className="w-5 h-5" />
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
