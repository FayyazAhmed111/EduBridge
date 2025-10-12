import React, { useState, useEffect } from "react";
import {
  Users,
  Shield,
  FileText,
  ClipboardList,
  UserPlus,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// panels
import AdminUsersPanel from "../components/AdminUsersPanel";
import AdminMentorsPanel from "../components/AdminMentorsPanel";
import AdminScholarshipsPanel from "../components/AdminScholarshipsPanel";
import AdminAuditLogsPanel from "../components/AdminAuditLogsPanel";
import AdminAddPanel from "../components/AdminAddPanel";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [newAdmin, setNewAdmin] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Redirect if not admin
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role?.toLowerCase() !== "admin") {
      navigate("/admin");
    }
  }, [navigate]);

  // ✅ Logout
  const logout = () => {
    localStorage.clear();
    navigate("/admin");
  };


  const menuItems = [
    { key: "users", label: "Users", icon: Users },
    { key: "mentors", label: "Mentors", icon: Shield },
    { key: "scholarships", label: "Scholarships", icon: FileText },
    { key: "logs", label: "Audit Logs", icon: ClipboardList },
    { key: "newadmin", label: "Add Admin", icon: UserPlus },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r flex flex-col">
        <div className="p-6 text-2xl font-bold text-indigo-700 border-b">
          Admin Panel
        </div>

        <nav className="flex-1 flex flex-col space-y-1 p-3">
          {menuItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-left text-sm font-medium transition ${activeTab === key
                  ? "bg-indigo-100 text-indigo-700"
                  : "hover:bg-slate-100 text-gray-700"
                }`}
            >
              <Icon className="w-5 h-5" /> {label}
            </button>
          ))}
        </nav>

        <button
          onClick={logout}
          className="flex items-center gap-2 p-4 mt-auto text-red-600 hover:bg-red-50 border-t"
        >
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 capitalize text-gray-800">
          {activeTab.replace("-", " ")}
        </h1>

        {/* USERS */}
        {activeTab === "users" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <AdminUsersPanel />
          </div>
        )}

        {/* MENTORS */}
        {activeTab === "mentors" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <AdminMentorsPanel />
          </div>
        )}

        {/* SCHOLARSHIPS */}
        {activeTab === "scholarships" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <AdminScholarshipsPanel />
          </div>
        )}

        {/* AUDIT LOGS */}
        {activeTab === "logs" && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <AdminAuditLogsPanel />
          </div>
        )}

        {/* ADD ADMIN */}
        {activeTab === "newadmin" && (
          <div className="bg-white shadow-lg rounded-xl p-6">
            <AdminAddPanel />
          </div>
        )}
      </main>
    </div>
  );
}
