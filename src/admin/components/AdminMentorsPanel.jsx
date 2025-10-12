import React, { useEffect, useState, useMemo } from "react";
import {
    listMentors,
    getMentorById,
    approveMentor,
    rejectMentor,
} from "../../services/adminApi";
import { Search, User, Eye, Check, X, Loader2 } from "lucide-react";

const AdminMentorsPanel = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [error, setError] = useState("");
    const [busyId, setBusyId] = useState(null);

    // Load mentors
    const fetchMentors = async () => {
        setLoading(true);
        try {
            const res = await listMentors();
            setMentors(res.data || []);
        } catch (e) {
            setError(e?.response?.data?.message || "Failed to load mentors");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMentors();
    }, []);

    const filteredMentors = useMemo(() => {
        if (!search.trim()) return mentors;
        const q = search.toLowerCase();
        return mentors.filter((m) =>
            `${m.name} ${m.email} ${m.field || ""} ${m.status}`.toLowerCase().includes(q)
        );
    }, [mentors, search]);

    // Approve / Reject mentor
    const handleApprove = async (id) => {
        if (!window.confirm("Approve this mentor?")) return;
        try {
            setBusyId(id);
            await approveMentor(id);
            await fetchMentors();
        } catch (e) {
            alert(e?.response?.data?.message || "Failed to approve");
        } finally {
            setBusyId(null);
        }
    };

    const handleReject = async (id) => {
        const reason = window.prompt("Reason for rejection?");
        if (reason === null) return;
        try {
            setBusyId(id);
            await rejectMentor(id, reason);
            await fetchMentors();
        } catch (e) {
            alert(e?.response?.data?.message || "Failed to reject");
        } finally {
            setBusyId(null);
        }
    };

    // Open modal
    const openMentorModal = async (mentor) => {
        setSelectedMentor(mentor);
        setModalOpen(true);
        setModalLoading(true);
        try {
            const res = await getMentorById(mentor._id);
            setSelectedMentor(res.data);
        } catch (e) {
            setSelectedMentor({ error: e?.response?.data?.message || "Failed to fetch details" });
        } finally {
            setModalLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-900">Mentors</h2>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search name, email, status..."
                            className="pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        onClick={fetchMentors}
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
                            <th className="text-left px-4 py-3">Name</th>
                            <th className="text-left px-4 py-3">Email</th>
                            <th className="text-left px-4 py-3">Field</th>
                            <th className="text-left px-4 py-3">Status</th>
                            <th className="text-right px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center">
                                    <Loader2 className="animate-spin w-6 h-6 mx-auto text-indigo-600" />
                                </td>
                            </tr>
                        ) : filteredMentors.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                                    No mentors found.
                                </td>
                            </tr>
                        ) : (
                            filteredMentors.map((m) => (
                                <tr key={m._id} className="border-t hover:bg-gray-50 transition">
                                    <td className="px-4 py-3 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <button
                                            onClick={() => openMentorModal(m)}
                                            className="text-indigo-600 hover:underline"
                                        >
                                            {m.name || "Unnamed"}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">{m.email}</td>
                                    <td className="px-4 py-3">{m.field || "—"}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`px-2 py-0.5 rounded border text-xs font-semibold ${m.status === "approved"
                                                    ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                                    : m.status === "pending"
                                                        ? "bg-amber-50 border-amber-200 text-amber-700"
                                                        : "bg-red-50 border-red-200 text-red-700"
                                                }`}
                                        >
                                            {m.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            {m.status === "pending" && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(m._id)}
                                                        disabled={busyId === m._id}
                                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-green-300 text-green-700 hover:bg-green-50 text-xs"
                                                    >
                                                        <Check className="w-4 h-4" /> Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(m._id)}
                                                        disabled={busyId === m._id}
                                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 text-xs"
                                                    >
                                                        <X className="w-4 h-4" /> Reject
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => openMentorModal(m)}
                                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border hover:bg-slate-50 text-xs"
                                            >
                                                <Eye className="w-4 h-4" /> View
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mentor modal */}
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
                            <h3 className="text-lg font-semibold mb-1">Mentor Details</h3>
                            <p className="text-sm text-gray-500 mb-4">{selectedMentor?.email}</p>

                            {modalLoading ? (
                                <div className="text-gray-500 text-sm">Loading details...</div>
                            ) : selectedMentor?.error ? (
                                <div className="text-red-600 text-sm">{selectedMentor.error}</div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <Info label="Name" value={selectedMentor?.name} />
                                    <Info label="Email" value={selectedMentor?.email} />
                                    <Info label="Status" value={selectedMentor?.status} />
                                    <Info label="Field" value={selectedMentor?.field || "—"} />
                                    <Info label="Experience" value={selectedMentor?.experience || "—"} />
                                    <Info label="Approved At" value={selectedMentor?.approvedAt ? new Date(selectedMentor.approvedAt).toLocaleString() : "—"} />
                                    <div className="sm:col-span-2">
                                        <div className="text-slate-700 font-medium mb-1">Expertise</div>
                                        <div className="flex flex-wrap gap-2">
                                            {(selectedMentor?.expertise || []).map((x, i) => (
                                                <span key={i} className="px-2 py-1 text-xs rounded bg-slate-100 border">
                                                    {x}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 flex items-center justify-end gap-2">
                                {selectedMentor?.status === "pending" && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(selectedMentor._id)}
                                            className="px-3 py-2 rounded-lg border border-green-300 text-green-700 hover:bg-green-50"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(selectedMentor._id)}
                                            className="px-3 py-2 rounded-lg border border-red-300 text-red-700 hover:bg-red-50"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
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

export default AdminMentorsPanel;
