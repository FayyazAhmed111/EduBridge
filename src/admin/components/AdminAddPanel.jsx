import React, { useState, useEffect } from "react";
import { sendAdminInviteOtp, registerAdmin } from "../../services/adminAddApi";
import {
  Mail,
  Lock,
  CheckCircle2,
  Loader2,
  Timer,
  RotateCcw,
} from "lucide-react";

export default function AdminAddPanel() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    let interval;
    if (timer > 0) interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async () => {
    if (!email.includes("@")) return setMessage("⚠️ Enter valid email.");
    setLoading(true);
    try {
      await sendAdminInviteOtp(email, token);
      setStep("otp");
      setMessage("✅ OTP sent. Check your email.");
      setTimer(60);
    } catch (err) {
      setMessage(err.message || "❌ Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (timer > 0) return;
    setLoading(true);
    try {
      await sendAdminInviteOtp(email, token);
      setMessage("✅ OTP resent.");
      setTimer(60);
    } catch (err) {
      setMessage(err.message || "❌ Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    if (!otp.trim()) return setMessage("⚠️ Enter valid OTP.");
    setStep("password");
    setMessage("");
  };

  const handleRegister = async () => {
    if (password.length < 6) return setMessage("⚠️ Password too short.");
    if (password !== confirmPassword)
      return setMessage("⚠️ Passwords do not match.");
    setLoading(true);
    try {
      await registerAdmin(
        {
          name: email.split("@")[0],
          email,
          password,
          secretCode: otp,
        },
        token
      );
      setMessage("✅ Admin registered successfully!");
      setStep("success");
    } catch (err) {
      setMessage(err.message || "❌ Failed to register admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border space-y-6">
      <h2 className="text-2xl font-bold text-indigo-700 text-center">
        Add New Admin
      </h2>

      {/* Step 1: Email */}
      {step === "email" && (
        <>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Admin Email
          </label>
          <div className="relative mb-3">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="email"
              className="w-full border rounded-lg p-2 pl-9 focus:ring-2 focus:ring-indigo-500"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg flex justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Send OTP"}
          </button>
        </>
      )}

      {/* Step 2: OTP */}
      {step === "otp" && (
        <>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter OTP
          </label>
          <input
            type="text"
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="flex justify-between items-center mt-3">
            <button
              onClick={handleVerifyOtp}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
            >
              Verify OTP
            </button>
            {timer > 0 ? (
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Timer className="w-4 h-4" /> Resend in {timer}s
              </div>
            ) : (
              <button
                onClick={handleResendOtp}
                className="flex items-center gap-1 text-indigo-600 text-sm"
              >
                <RotateCcw className="w-4 h-4" /> Resend OTP
              </button>
            )}
          </div>
        </>
      )}

      {/* Step 3: Passwords */}
      {step === "password" && (
        <>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative mb-3">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="password"
              className="w-full border rounded-lg p-2 pl-9 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative mb-3">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="password"
              className="w-full border rounded-lg p-2 pl-9 focus:ring-2 focus:ring-indigo-500"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg flex justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              "Register Admin"
            )}
          </button>
        </>
      )}

      {/* Step 4: Success */}
      {step === "success" && (
        <div className="text-center space-y-3">
          <CheckCircle2 className="text-green-600 w-10 h-10 mx-auto" />
          <p className="text-green-700 font-medium">
            Admin account created successfully!
          </p>
          <button
            onClick={() => {
              setEmail("");
              setOtp("");
              setPassword("");
              setConfirmPassword("");
              setStep("email");
              setMessage("");
            }}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg"
          >
            Add Another
          </button>
        </div>
      )}

      {message && (
        <p className="text-center text-sm text-gray-700 bg-gray-50 border rounded-lg p-2">
          {message}
        </p>
      )}
    </div>
  );
}
