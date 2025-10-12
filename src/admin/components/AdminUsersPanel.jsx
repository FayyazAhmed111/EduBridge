import React, { useEffect, useMemo, useState } from "react";
import {
    listUsers,
    getUserById,
    suspendUser as apiSuspendUser,
    unsuspendUser as apiUnsuspendUser,
    deleteUser as apiDeleteUser,
    restoreUser as apiRestoreUser,
} from "../../services/adminApi";
import { X, Search, User as UserIcon, Ban, RotateCcw, Trash2, Eye } from "lucide-react";

const AdminUsersPanel = () => {
    const [users, setUsers] = useState([]);
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);       // brief row
    const [selectedUserFull, setSelectedUserFull] = useState(null); // fetched details
    const [actionBusyId, setActionBusyId] = useState(null);
    const [error, setError] = useState("");

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await listUsers();
            setUsers(res.data || []);
        } catch (e) {
            setError(e?.response?.data?.message || "Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filtered = useMemo(() => {
        if (!q.trim()) return users;
        const key = q.toLowerCase();
        return users.filter((u) => {
            const hay = `${u?.name || ""} ${u?.email || ""} ${u?.role || ""} ${u?.phone || ""}`.toLowerCase();
            return hay.includes(key);
        });
    }, [q, users]);

    const openUserModal = async (user) => {
        setSelectedUser(user);
        setSelectedUserFull(null);
        setModalOpen(true);
        setModalLoading(true);
        try {
            const res = await getUserById(user._id);
            setSelectedUserFull(res.data);
        } catch (e) {
            setSelectedUserFull({ error: e?.response?.data?.message || "Failed to load user" });
        } finally {
            setModalLoading(false);
        }
    };

    const doSuspend = async (user) => {
        const reason = window.prompt("Reason for suspension? (optional)", "");
        const hours = window.prompt("Suspend for how many hours? Leave empty for permanent.", "");
        if (hours === null) return;

        try {
            setActionBusyId(user._id);
            const until =
                hours && !isNaN(Number(hours))
                    ? new Date(Date.now() + Number(hours) * 3600 * 1000).toISOString()
                    : undefined;

            await apiSuspendUser({ userId: user._id, reason: reason || undefined, until });
            await fetchUsers();
            if (modalOpen && selectedUser?._id === user._id) {
                // refresh modal details too
                const res = await getUserById(user._id);
                setSelectedUserFull(res.data);
            }
        } catch (e) {
            alert(e?.response?.data?.message || "Failed to suspend user");
        } finally {
            setActionBusyId(null);
        }
    };

    const doUnsuspend = async (user) => {
        try {
            setActionBusyId(user._id);
            await apiUnsuspendUser({ userId: user._id });
            await fetchUsers();
            if (modalOpen && selectedUser?._id === user._id) {
                const res = await getUserById(user._id);
                setSelectedUserFull(res.data);
            }
        } catch (e) {
            alert(e?.response?.data?.message || "Failed to unsuspend user");
        } finally {
            setActionBusyId(null);
        }
    };

    const doDelete = async (user) => {
        if (!window.confirm(`Delete ${user.name} (${user.email})? This is soft-delete if your API supports it.`)) return;
        try {
            setActionBusyId(user._id);
            await apiDeleteUser(user._id);
            await fetchUsers();
            if (modalOpen) setModalOpen(false);
        } catch (e) {
            alert(e?.response?.data?.message || "Failed to delete user");
        } finally {
            setActionBusyId(null);
        }
    };

    const doRestore = async (user) => {
        if (!window.confirm(`Restore ${user.name}?`)) return;
        try {
            setActionBusyId(user._id);
            await apiRestoreUser(user._id);
            await fetchUsers();
        } catch (e) {
            alert(e?.response?.data?.message || "Failed to restore user");
        } finally {
            setActionBusyId(null);
        }
    };

    return (
        <div className="space-y-4">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-900">Users</h2>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search name, email, role…"
                            className="pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        onClick={fetchUsers}
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

            <div className="overflow-x-auto rounded-xl border">
                <table className="min-w-full bg-white text-sm">
                    <thead className="bg-slate-50 text-slate-700">
                        <tr>
                            <th className="text-left px-4 py-3">User</th>
                            <th className="text-left px-4 py-3">Email</th>
                            <th className="text-left px-4 py-3">Role</th>
                            <th className="text-left px-4 py-3">Status</th>
                            <th className="text-right px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td className="px-4 py-6 text-center" colSpan={5}>Loading…</td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td className="px-4 py-6 text-center" colSpan={5}>No users</td></tr>
                        ) : (
                            filtered.map((u) => {
                                const suspended =
                                    u.isSuspended || (u.suspendedUntil && new Date(u.suspendedUntil) > new Date());
                                const deleted = !!u.isDeleted;

                                return (
                                    <tr key={u._id} className="border-t">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
                                                    <UserIcon className="w-4 h-4" />
                                                </div>
                                                <button
                                                    className="text-indigo-600 hover:underline"
                                                    onClick={() => openUserModal(u)}
                                                    title="View details"
                                                >
                                                    {u.name || "Unnamed"}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">{u.email}</td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-0.5 rounded bg-slate-100 border text-slate-700">
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {deleted ? (
                                                <span className="px-2 py-0.5 rounded bg-red-50 border border-red-200 text-red-700">
                                                    Deleted
                                                </span>
                                            ) : suspended ? (
                                                <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700">
                                                    Suspended
                                                </span>
                                            ) : (
                                                <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700">
                                                    Active
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-2">
                                                {!deleted && !suspended && (
                                                    <button
                                                        onClick={() => doSuspend(u)}
                                                        disabled={actionBusyId === u._id}
                                                        className="px-2.5 py-1.5 text-xs rounded-lg border hover:bg-slate-50 flex items-center gap-1"
                                                        title="Suspend"
                                                    >
                                                        <Ban className="w-4 h-4" /> Suspend
                                                    </button>
                                                )}
                                                {!deleted && suspended && (
                                                    <button
                                                        onClick={() => doUnsuspend(u)}
                                                        disabled={actionBusyId === u._id}
                                                        className="px-2.5 py-1.5 text-xs rounded-lg border hover:bg-slate-50 flex items-center gap-1"
                                                        title="Unsuspend"
                                                    >
                                                        <RotateCcw className="w-4 h-4" /> Unsuspend
                                                    </button>
                                                )}
                                                {!deleted ? (
                                                    <button
                                                        onClick={() => doDelete(u)}
                                                        disabled={actionBusyId === u._id}
                                                        className="px-2.5 py-1.5 text-xs rounded-lg border hover:bg-slate-50 flex items-center gap-1 text-red-600 border-red-200"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Delete
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => doRestore(u)}
                                                        disabled={actionBusyId === u._id}
                                                        className="px-2.5 py-1.5 text-xs rounded-lg border hover:bg-slate-50 flex items-center gap-1"
                                                        title="Restore"
                                                    >
                                                        Restore
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => openUserModal(u)}
                                                    className="px-2.5 py-1.5 text-xs rounded-lg border hover:bg-slate-50 flex items-center gap-1"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" /> View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* User details modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative">
                        <button
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                            onClick={() => setModalOpen(false)}
                            title="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-6">
                            <h3 className="text-lg font-semibold mb-1">User Details</h3>
                            <p className="text-sm text-gray-500 mb-4">{selectedUser?.email}</p>

                            {modalLoading ? (
                                <div className="text-sm text-gray-500">Loading details…</div>
                            ) : selectedUserFull?.error ? (
                                <div className="text-red-600 text-sm">{selectedUserFull.error}</div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <Info label="Name" value={selectedUserFull?.name} />
                                    <Info label="Email" value={selectedUserFull?.email} />
                                    <Info label="Role" value={selectedUserFull?.role} />
                                    <Info label="Phone" value={selectedUserFull?.phone || "—"} />
                                    <Info label="Verified" value={selectedUserFull?.isVerified ? "Yes" : "No"} />
                                    <Info label="Suspended" value={selectedUserFull?.isSuspended ? "Yes" : "No"} />
                                    <Info
                                        label="Suspended Until"
                                        value={
                                            selectedUserFull?.suspendedUntil
                                                ? new Date(selectedUserFull.suspendedUntil).toLocaleString()
                                                : "—"
                                        }
                                    />
                                    <Info
                                        label="Deleted"
                                        value={selectedUserFull?.isDeleted ? `Yes (${selectedUserFull?.deletedAt ? new Date(selectedUserFull.deletedAt).toLocaleString() : ""})` : "No"}
                                    />
                                    {selectedUserFull?.role === "mentor" && (
                                        <>
                                            <Info label="Mentor Status" value={selectedUserFull?.mentorProfile?.status || "—"} />
                                            <div className="sm:col-span-2">
                                                <div className="text-slate-700 font-medium mb-1">Expertise</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {(selectedUserFull?.mentorProfile?.expertise || []).map((x, i) => (
                                                        <span key={i} className="px-2 py-1 text-xs rounded bg-slate-100 border">
                                                            {x}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {selectedUserFull?.role === "student" && (
                                        <>
                                            <Info label="Level" value={selectedUserFull?.studentProfile?.level || "—"} />
                                            <Info label="Field" value={selectedUserFull?.studentProfile?.fieldOfStudy || "—"} />
                                            <Info label="GPA" value={selectedUserFull?.studentProfile?.gpa || "—"} />
                                        </>
                                    )}
                                </div>
                            )}

                            <div className="mt-6 flex items-center justify-end gap-2">
                                {!selectedUserFull?.isDeleted && !selectedUserFull?.isSuspended && (
                                    <button
                                        onClick={() => doSuspend(selectedUserFull)}
                                        className="px-3 py-2 rounded-lg border border-amber-300 text-amber-700 hover:bg-amber-50"
                                    >
                                        Suspend
                                    </button>
                                )}
                                {!selectedUserFull?.isDeleted && selectedUserFull?.isSuspended && (
                                    <button
                                        onClick={() => doUnsuspend(selectedUserFull)}
                                        className="px-3 py-2 rounded-lg border hover:bg-slate-50"
                                    >
                                        Unsuspend
                                    </button>
                                )}
                                {!selectedUserFull?.isDeleted ? (
                                    <button
                                        onClick={() => doDelete(selectedUserFull)}
                                        className="px-3 py-2 rounded-lg border border-red-300 text-red-700 hover:bg-red-50"
                                    >
                                        Delete
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => doRestore(selectedUserFull)}
                                        className="px-3 py-2 rounded-lg border hover:bg-slate-50"
                                    >
                                        Restore
                                    </button>
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

export default AdminUsersPanel;
