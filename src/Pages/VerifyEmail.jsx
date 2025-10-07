import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../services/authApi";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await verifyEmail(token);
                setStatus("success");
                setMessage(res.message || "Your email has been verified successfully!");

                setTimeout(() => {
                    navigate("/", { state: { showLogin: true }, replace: true });
                }, 3000);
            } catch (err) {
                setStatus("error");
                setMessage(err.message || "Invalid or expired verification link.");
            }
        };

        verify();
    }, [token, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 px-6">
            <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md text-center border border-gray-200">
                {status === "loading" && (
                    <>
                        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <h2 className="text-lg font-semibold text-gray-700">
                            Verifying your email...
                        </h2>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">✅</span>
                        </div>
                        <h2 className="text-xl font-bold text-green-700 mb-2">Email Verified!</h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <p className="text-sm text-gray-500">
                            Redirecting you to the login page...
                        </p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">❌</span>
                        </div>
                        <h2 className="text-xl font-bold text-red-700 mb-2">Verification Failed</h2>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <button
                            onClick={() => navigate("/", { replace: true })}
                            className="cursor-pointer px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
                        >
                            Back to Home
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
