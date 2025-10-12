import React, { useEffect, useState, useMemo } from "react";
import {
    listForumPosts,
    hidePost,
    deletePost,
} from "../../services/adminApi";
import { Search, Eye, X, Trash2, MessageSquare, Loader2 } from "lucide-react";

const AdminForumsPanel = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [busyId, setBusyId] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    // Load all posts
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await listForumPosts();
            setPosts(res.data || []);
        } catch (e) {
            setError(e?.response?.data?.message || "Failed to load forum posts");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filteredPosts = useMemo(() => {
        if (!query.trim()) return posts;
        const q = query.toLowerCase();
        return posts.filter(
            (p) =>
                p.title?.toLowerCase().includes(q) ||
                p.user?.email?.toLowerCase().includes(q)
        );
    }, [posts, query]);

    // Actions
    const handleHide = async (id) => {
        if (!window.confirm("Hide this post?")) return;
        try {
            setBusyId(id);
            await hidePost(id);
            await fetchPosts();
        } catch (e) {
            alert(e?.response?.data?.message || "Failed to hide post");
        } finally {
            setBusyId(null);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Permanently delete this post?")) return;
        try {
            setBusyId(id);
            await deletePost(id);
            await fetchPosts();
            setModalOpen(false);
        } catch (e) {
            alert(e?.response?.data?.message || "Failed to delete post");
        } finally {
            setBusyId(null);
        }
    };

    return (
        <div className="space-y-4">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-900">Forum Posts</h2>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search title, user..."
                            className="pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        onClick={fetchPosts}
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
                            <th className="text-left px-4 py-3">User</th>
                            <th className="text-left px-4 py-3">Status</th>
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
                        ) : filteredPosts.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                                    No posts found.
                                </td>
                            </tr>
                        ) : (
                            filteredPosts.map((p) => (
                                <tr key={p._id} className="border-t hover:bg-gray-50 transition">
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => {
                                                setSelectedPost(p);
                                                setModalOpen(true);
                                            }}
                                            className="text-indigo-600 hover:underline flex items-center gap-1"
                                        >
                                            <MessageSquare className="w-4 h-4" /> {p.title || "Untitled"}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">{p.user?.email || "—"}</td>
                                    <td className="px-4 py-3">
                                        {p.hidden ? (
                                            <span className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700 text-xs">
                                                Hidden
                                            </span>
                                        ) : (
                                            <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs">
                                                Visible
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            {!p.hidden && (
                                                <button
                                                    onClick={() => handleHide(p._id)}
                                                    disabled={busyId === p._id}
                                                    className="px-3 py-1.5 rounded-lg border border-amber-300 text-amber-700 hover:bg-amber-50 text-xs"
                                                >
                                                    Hide
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDelete(p._id)}
                                                disabled={busyId === p._id}
                                                className="px-3 py-1.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 text-xs"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedPost(p);
                                                    setModalOpen(true);
                                                }}
                                                className="px-3 py-1.5 rounded-lg border hover:bg-slate-50 text-xs flex items-center gap-1"
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

            {/* Modal */}
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
                            <h3 className="text-lg font-semibold mb-2">
                                {selectedPost?.title}
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Posted by {selectedPost?.user?.email || "Unknown"}
                            </p>
                            <div className="p-3 border rounded-lg bg-slate-50 text-sm leading-relaxed">
                                {selectedPost?.content || "No content available."}
                            </div>

                            <div className="mt-6 flex justify-end gap-2">
                                {!selectedPost?.hidden && (
                                    <button
                                        onClick={() => handleHide(selectedPost._id)}
                                        className="px-3 py-2 rounded-lg border border-amber-300 text-amber-700 hover:bg-amber-50"
                                    >
                                        Hide
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(selectedPost._id)}
                                    className="px-3 py-2 rounded-lg border border-red-300 text-red-700 hover:bg-red-50"
                                >
                                    Delete
                                </button>
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

export default AdminForumsPanel;
