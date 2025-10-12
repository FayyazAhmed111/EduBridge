import React, { useEffect, useState, useMemo } from "react";
import { listScholarships } from "../../services/adminApi";
import { Search, Calendar, Eye, X, Loader2, Link2 } from "lucide-react";

const AdminScholarshipsPanel = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchScholarships = async () => {
    setLoading(true);
    try {
      const res = await listScholarships();
      setScholarships(res.data || []);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load scholarships");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return scholarships;
    const q = query.toLowerCase();
    return scholarships.filter(
      (s) =>
        s.name?.toLowerCase().includes(q) ||
        s.organization?.toLowerCase().includes(q)
    );
  }, [scholarships, query]);

  return (
    <div className="space-y-4">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-xl font-semibold text-slate-900">Scholarships</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or organization..."
              className="pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={fetchScholarships}
            className="px-3 py-2 rounded-lg border text-sm hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>
      </header>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Organization</th>
              <th className="text-left px-4 py-3">Deadline</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center">
                  <Loader2 className="animate-spin w-6 h-6 mx-auto text-indigo-600" />
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                  No scholarships found.
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr
                  key={s._id}
                  className="border-t hover:bg-gray-50 transition text-slate-700"
                >
                  <td className="px-4 py-3">{s.name}</td>
                  <td className="px-4 py-3">{s.organization}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    {s.deadline
                      ? new Date(s.deadline).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        setSelected(s);
                        setModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-lg border hover:bg-slate-50 text-xs flex items-center gap-1"
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

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <h3 className="text-lg font-semibold mb-1">
                {selected?.title || "Scholarship Details"}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {selected?.organization || "—"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <Info label="Title" value={selected?.name} />
                <Info label="Organization" value={selected?.organization} />
                <Info
                  label="Deadline"
                  value={
                    selected?.deadline
                      ? new Date(selected.deadline).toLocaleDateString()
                      : "—"
                  }
                />
                <Info label="Country" value={selected?.country || "—"} />
                <Info
                  label="Level"
                  value={selected?.level?.toUpperCase() || "—"}
                />
                <Info label="Field" value={selected?.field || "—"} />
                <Info
                  label="Type"
                  value={selected?.type || "—"}
                />
                <div className="sm:col-span-2">
                  <div className="text-slate-600 font-medium mb-1">
                    Description
                  </div>
                  <div className="p-3 border rounded-lg bg-slate-50 text-gray-700 text-sm leading-relaxed">
                    {selected?.description || "No description provided."}
                  </div>
                </div>
                {selected?.link && (
                  <div className="sm:col-span-2 flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-indigo-500" />
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:underline text-sm"
                    >
                      Visit Official Website
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-2 rounded-lg border hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <div className="text-slate-600">{label}</div>
    <div className="font-medium text-slate-900">{value ?? "—"}</div>
  </div>
);

export default AdminScholarshipsPanel;
