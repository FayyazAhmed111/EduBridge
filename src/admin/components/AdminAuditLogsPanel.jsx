import React, { useEffect, useState } from "react";
import {
  getAuditLogs,
  getAuditLogById,
  getAuditStats,
  exportAuditCsv,
} from "../../services/adminAuditApi";
import {
  Loader2,
  Eye,
  FileDown,
  RefreshCcw,
  X,
  Search,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function AdminAuditLogsPanel() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const token = localStorage.getItem("accessToken");

  // 🔹 Fetch all logs
  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await getAuditLogs(token, page, query);
      setLogs(res.items || []);
      setPages(res.pages || 1);
      setError("");
    } catch (err) {
      console.error("Audit Logs Fetch Error:", err);
      setError("Failed to load audit logs.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch stats
  const fetchStats = async () => {
    try {
      const res = await getAuditStats(token);
      setStats(res);
    } catch (err) {
      console.error("Stats error:", err);
    }
  };

  // 🔹 Fetch on load
  useEffect(() => {
    fetchLogs();
    fetchStats();
  }, [page]);

  // 🔹 Open modal for details
  const openLog = async (id) => {
    setModalLoading(true);
    try {
      const res = await getAuditLogById(id, token);
      setSelected(res);
      setModalOpen(true);
    } catch (err) {
      console.error(err);
      alert("Failed to load log details.");
    } finally {
      setModalLoading(false);
    }
  };

  const filtered = logs.filter(
    (l) =>
      l.action?.toLowerCase().includes(query.toLowerCase()) ||
      l.actorEmail?.toLowerCase().includes(query.toLowerCase()) ||
      l.message?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-xl font-semibold text-slate-900">
          Audit Logs Management
        </h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search action or email..."
              className="pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={fetchLogs}
            className="px-3 py-2 rounded-lg border text-sm hover:bg-gray-50 flex items-center gap-1"
          >
            <RefreshCcw className="w-4 h-4" /> Refresh
          </button>
          <button
            onClick={() => exportAuditCsv(token)}
            className="px-3 py-2 rounded-lg border text-sm hover:bg-gray-50 flex items-center gap-1"
          >
            <FileDown className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Most Common Action</p>
            <p className="text-2xl font-bold text-indigo-600">
              {stats.byAction?.[0]?._id || "—"}
            </p>
          </div>
          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Most Common Outcome</p>
            <p className="text-2xl font-bold text-indigo-600">
              {stats.outcomes?.[0]?._id || "—"}
            </p>
          </div>
          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 text-sm">Total Logs</p>
            <p className="text-2xl font-bold text-indigo-600">
              {stats.byAction?.reduce((acc, a) => acc + a.count, 0) || 0}
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="text-left px-4 py-3">Actor Email</th>
              <th className="text-left px-4 py-3">Action</th>
              <th className="text-left px-4 py-3">Outcome</th>
              <th className="text-left px-4 py-3">Severity & Timestamp</th>
              <th className="text-left px-4 py-3">Details</th>
              <th className="text-right px-4 py-3"> </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="py-6 text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-indigo-600 mx-auto" />
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-gray-500">
                  No audit logs found.
                </td>
              </tr>
            ) : (
              filtered.map((log) => (
                <tr
                  key={log._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 text-gray-700">
                    {log.actorEmail || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{log.action}</td>
                  <td className="px-4 py-3 text-gray-700">{log.outcome || "—"}</td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-1">
                    {log.severity === "high" && (
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    )}
                    {log.severity === "medium" && (
                      <Activity className="w-4 h-4 text-yellow-500" />
                    )}
                    {log.severity === "low" && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    <span className="capitalize">{log.severity || "—"}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4 text-indigo-400" />
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openLog(log._id)}
                      className="px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1 hover:bg-slate-50"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-3 mt-3">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {pages}
        </span>
        <button
          disabled={page >= pages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              {modalLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="animate-spin w-6 h-6 text-indigo-600" />
                </div>
              ) : selected ? (
                <>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {selected.action}
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                    <p>
                      <strong>Email:</strong> {selected.actorEmail || "—"}
                    </p>
                    <p>
                      <strong>Outcome:</strong> {selected.outcome || "—"}
                    </p>
                    <p>
                      <strong>Severity:</strong>{" "}
                      {selected.severity || "—"}
                    </p>
                    <p>
                      <strong>Time:</strong>{" "}
                      {new Date(selected.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="border rounded-lg bg-slate-50 p-3 mb-4">
                    <p className="text-gray-700 whitespace-pre-line">
                      {selected.message || "No message details."}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 rounded-lg border hover:bg-slate-50"
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-center">No log selected.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
