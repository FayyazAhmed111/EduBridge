import React, { useState, useEffect } from "react";
import {
  Users,
  Shield,
  FileText,
  Bell,
  UserPlus,
  ClipboardList,
  LogOut,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import {
  listUsers,
  suspendUser,
  unsuspendUser,
  deleteUser,
  listMentors,
  approveMentor,
  rejectMentor,
  listForumPosts,
  hidePost,
  deletePost,
  listScholarships,
  listAuditLogs,
  sendNotification,
  createAdmin,
  getDashboardStats,
} from "../../services/adminApi";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({});
  const [notification, setNotification] = useState("");
  const [newAdmin, setNewAdmin] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [message, setMessage] = useState("");

  // redirect if not admin
  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role?.toLowerCase() !== "admin") {
      navigate("/admin");
    } else {
      loadStats();
      fetchData("users");
    }
  }, []);

  // generic data fetcher
  const fetchData = async (type) => {
    setLoading(true);
    setActiveTab(type);
    try {
      switch (type) {
        case "users":
          setData((await listUsers()).data);
          break;
        case "mentors":
          setData((await listMentors()).data);
          break;
        case "forums":
          setData((await listForumPosts()).data);
          break;
        case "scholarships":
          setData((await listScholarships()).data);
          break;
        case "logs":
          setData((await listAuditLogs()).data);
          break;
        default:
          setData([]);
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data || {});
    } catch (err) {
      console.error("Stats load error:", err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/admin");
  };

  // handle notification send
  const handleSendNotification = async () => {
    if (!notification.trim()) return;
    try {
      await sendNotification({ message: notification });
      setMessage("✅ Notification sent successfully");
      setNotification("");
    } catch (err) {
      setMessage("❌ Failed to send notification");
    }
  };

  // handle admin invite
  const handleAdminInvite = async () => {
    try {
      const res = await createAdmin({ email: newAdmin });
      if (res.data?.requiresOtp) {
        setShowOtpField(true);
        setMessage("OTP sent to email. Enter below to verify.");
      } else {
        setMessage("Admin added successfully.");
      }
    } catch (err) {
      setMessage("❌ Error creating admin");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await createAdmin({ email: newAdmin, otp });
      setMessage("✅ Admin verified successfully");
      setNewAdmin("");
      setOtp("");
      setShowOtpField(false);
    } catch {
      setMessage("❌ Invalid OTP");
    }
  };

  // render table based on active tab
  const renderTable = () => {
    if (loading)
      return (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
        </div>
      );

    if (!data?.length) return <p className="text-gray-500">No data found.</p>;

    switch (activeTab) {
      case "users":
        return (
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((u) => (
                <tr key={u._id} className="border-t text-sm">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.suspended ? "Suspended" : "Active"}</td>
                  <td className="p-3 flex gap-2">
                    {!u.suspended ? (
                      <button
                        onClick={() => suspendUser(u._id)}
                        className="text-yellow-600 hover:underline"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => unsuspendUser(u._id)}
                        className="text-green-600 hover:underline"
                      >
                        Unsuspend
                      </button>
                    )}
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "mentors":
        return (
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((m) => (
                <tr key={m._id} className="border-t text-sm">
                  <td className="p-3">{m.name}</td>
                  <td className="p-3">{m.email}</td>
                  <td className="p-3">{m.status}</td>
                  <td className="p-3 flex gap-2">
                    {m.status === "pending" && (
                      <>
                        <button
                          onClick={() => approveMentor(m._id)}
                          className="text-green-600 hover:underline"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectMentor(m._id)}
                          className="text-red-600 hover:underline"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "forums":
        return (
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="p-3">Title</th>
                <th className="p-3">User</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p._id} className="border-t text-sm">
                  <td className="p-3">{p.title}</td>
                  <td className="p-3">{p.user?.email}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => hidePost(p._id)}
                      className="text-yellow-600 hover:underline"
                    >
                      Hide
                    </button>
                    <button
                      onClick={() => deletePost(p._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "scholarships":
        return (
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="p-3">Title</th>
                <th className="p-3">Organization</th>
                <th className="p-3">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {data.map((s) => (
                <tr key={s._id} className="border-t text-sm">
                  <td className="p-3">{s.title}</td>
                  <td className="p-3">{s.organization}</td>
                  <td className="p-3">{s.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "logs":
        return (
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="p-3">User</th>
                <th className="p-3">Action</th>
                <th className="p-3">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {data.map((log) => (
                <tr key={log._id} className="border-t text-sm">
                  <td className="p-3">{log.user?.email}</td>
                  <td className="p-3">{log.action}</td>
                  <td className="p-3">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl border-r">
        <div className="p-6 text-2xl font-bold text-blue-700">Admin Panel</div>
        <nav className="flex flex-col space-y-2 p-3">
          {[
            { key: "users", label: "Users", icon: Users },
            { key: "mentors", label: "Mentors", icon: Shield },
            { key: "forums", label: "Forums", icon: ClipboardList },
            { key: "scholarships", label: "Scholarships", icon: FileText },
            { key: "logs", label: "Audit Logs", icon: ClipboardList },
            { key: "notifications", label: "Notifications", icon: Bell },
            { key: "newadmin", label: "Add Admin", icon: UserPlus },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => fetchData(key)}
              className={`flex items-center gap-2 p-3 rounded-lg text-left transition ${
                activeTab === key
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              <Icon className="w-5 h-5" /> {label}
            </button>
          ))}
          <button
            onClick={logout}
            className="flex items-center gap-2 p-3 mt-5 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {activeTab.replace("-", " ")}
        </h1>

        {/* notification section */}
        {activeTab === "notifications" && (
          <div className="space-y-4">
            <textarea
              value={notification}
              onChange={(e) => setNotification(e.target.value)}
              placeholder="Enter notification message..."
              className="w-full border rounded-lg p-3 h-32"
            />
            <button
              onClick={handleSendNotification}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Send Notification
            </button>
          </div>
        )}

        {/* new admin section */}
        {activeTab === "newadmin" && (
          <div className="space-y-4">
            <input
              type="email"
              value={newAdmin}
              onChange={(e) => setNewAdmin(e.target.value)}
              placeholder="Enter admin email"
              className="w-full border rounded-lg p-3"
            />
            {!showOtpField ? (
              <button
                onClick={handleAdminInvite}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Send OTP
              </button>
            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full border rounded-lg p-3"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                >
                  Verify & Add Admin
                </button>
              </div>
            )}
          </div>
        )}

        {/* table sections */}
        {["users", "mentors", "forums", "scholarships", "logs"].includes(
          activeTab
        ) && <div className="bg-white shadow-lg rounded-xl p-6">{renderTable()}</div>}

        {message && (
          <div className="mt-6 bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg">
            {message}
          </div>
        )}
      </main>
    </div>
  );
}
