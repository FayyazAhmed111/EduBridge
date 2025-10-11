import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { getCurrentUser, updateProfile, changePassword } from "../services/authApi";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [changing, setChanging] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const token = localStorage.getItem("accessToken");

    // Fetch user details
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getCurrentUser(token);
                setUser(data.user || data);
            } catch (err) {
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [token]);

    // Handle profile update
    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setUpdating(true);

        try {
            const res = await updateProfile(user, token);
            setSuccess(res.message || "Profile updated successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile");
        } finally {
            setUpdating(false);
        }
    };

    // Handle password change
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!oldPassword || !newPassword || !confirmPassword) {
            return setError("Please fill in all password fields.");
        }
        if (newPassword !== confirmPassword) {
            return setError("New passwords do not match.");
        }
        if (newPassword.length < 6) {
            return setError("Password must be at least 6 characters long.");
        }

        setChanging(true);
        try {
            const res = await changePassword(oldPassword, newPassword, token);
            setSuccess(res.message || "Password changed successfully!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to change password");
        } finally {
            setChanging(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center text-gray-600">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="flex-1 flex justify-center px-6 py-10">
                <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

                    {error && (
                        <p className="text-red-600 text-sm bg-red-50 border border-red-200 px-3 py-2 rounded-lg mb-4">
                            {error}
                        </p>
                    )}
                    {success && (
                        <p className="text-green-600 text-sm bg-green-50 border border-green-200 px-3 py-2 rounded-lg mb-4">
                            {success}
                        </p>
                    )}

                    {/* Profile Info Form */}
                    <form onSubmit={handleUpdate} className="space-y-5 mb-8">
                        {/* Common Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={user?.name || ""}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                    className="w-full px-4 py-2.5 border rounded-lg bg-gray-100 text-sm text-gray-600 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={user?.phone || ""}
                                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm transition"
                            />

                            {/* ✅ DOB fix — always formats correctly */}
                            <input
                                type="date"
                                value={
                                    user?.dob
                                        ? new Date(user.dob).toISOString().substring(0, 10)
                                        : ""
                                }
                                onChange={(e) => setUser({ ...user, dob: e.target.value })}
                                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm transition"
                            />

                            {/* ✅ Gender fix — normalizes capitalization */}
                            <select
                                value={
                                    user?.gender
                                        ? user.gender.charAt(0).toUpperCase() +
                                        user.gender.slice(1).toLowerCase()
                                        : ""
                                }
                                onChange={(e) => setUser({ ...user, gender: e.target.value })}
                                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm transition"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Role-specific sections (Student / Mentor) */}
                        {user?.role === "student" && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Institution"
                                        value={user?.studentProfile?.institution || ""}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                studentProfile: {
                                                    ...user.studentProfile,
                                                    institution: e.target.value,
                                                },
                                            })
                                        }
                                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Field of Study"
                                        value={user?.studentProfile?.fieldOfStudy || ""}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                studentProfile: {
                                                    ...user.studentProfile,
                                                    fieldOfStudy: e.target.value,
                                                },
                                            })
                                        }
                                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="GPA"
                                        value={user?.studentProfile?.gpa || ""}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                studentProfile: {
                                                    ...user.studentProfile,
                                                    gpa: e.target.value,
                                                },
                                            })
                                        }
                                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                                    />
                                    <input
                                        type="url"
                                        placeholder="Student ID URL"
                                        value={user?.studentProfile?.studentIdUrl || ""}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                studentProfile: {
                                                    ...user.studentProfile,
                                                    studentIdUrl: e.target.value,
                                                },
                                            })
                                        }
                                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                                    />
                                </div>

                                <textarea
                                    placeholder="Career Goals"
                                    value={user?.studentProfile?.careerGoals || ""}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            studentProfile: {
                                                ...user.studentProfile,
                                                careerGoals: e.target.value,
                                            },
                                        })
                                    }
                                    className="w-full px-4 py-2.5 min-h-[80px] border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                                />
                            </>
                        )}

                        {user?.role === "mentor" && (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Occupation"
                                        value={user?.mentorProfile?.occupation || ""}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                mentorProfile: {
                                                    ...user.mentorProfile,
                                                    occupation: e.target.value,
                                                },
                                            })
                                        }
                                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Organization"
                                        value={user?.mentorProfile?.organization || ""}
                                        onChange={(e) =>
                                            setUser({
                                                ...user,
                                                mentorProfile: {
                                                    ...user.mentorProfile,
                                                    organization: e.target.value,
                                                },
                                            })
                                        }
                                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                                    />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Highest Education"
                                    value={user?.mentorProfile?.highestEducation || ""}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            mentorProfile: {
                                                ...user.mentorProfile,
                                                highestEducation: e.target.value,
                                            },
                                        })
                                    }
                                    className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                                />
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={updating}
                            className="cursor-pointer w-full sm:w-auto py-2.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
                        >
                            {updating ? "Saving..." : "Save Changes"}
                        </button>
                    </form>

                    {/* Password Section */}
                    <div className="border-t pt-6 mt-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Change Password
                        </h2>
                        <form onSubmit={handlePasswordChange} className="space-y-5">
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                            />

                            <button
                                type="submit"
                                disabled={changing}
                                className="cursor-pointer w-full sm:w-auto py-2.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
                            >
                                {changing ? "Updating..." : "Update Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
