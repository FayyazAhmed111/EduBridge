import React, { useEffect, useState } from "react";
import {
  getAllQuestions,
  getQuestionDetails,
  deleteQuestion,
  deleteAnswer,
} from "../../services/adminForumApi";
import {
  Eye,
  Trash2,
  Loader2,
  Search,
  X,
  User,
  MessageSquare,
  Calendar,
} from "lucide-react";

export default function AdminForumsPanel() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const token = localStorage.getItem("accessToken");

  // ✅ Fetch all questions
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await getAllQuestions(token);
      setQuestions(res || []);
      setError("");
    } catch (err) {
      console.error("❌ Forum Fetch Error:", err);
      setError("Failed to load forum questions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // ✅ View question details
  const openQuestion = async (id) => {
    setModalLoading(true);
    try {
      const res = await getQuestionDetails(id, token);
      setSelected(res);
      setModalOpen(true);
    } catch (err) {
      console.error("Error loading question:", err);
      alert("Failed to load question details");
    } finally {
      setModalLoading(false);
    }
  };

  // ✅ Delete question
  const handleDeleteQuestion = async (id) => {
    if (!window.confirm("Delete this question permanently?")) return;
    try {
      await deleteQuestion(id, token);
      setQuestions((prev) => prev.filter((q) => q._id !== id));
      setModalOpen(false);
    } catch (err) {
      console.error("Delete Question Error:", err);
      alert("Failed to delete question");
    }
  };

  // ✅ Delete answer
  const handleDeleteAnswer = async (aid) => {
    if (!window.confirm("Delete this answer permanently?")) return;
    try {
      await deleteAnswer(aid, token);
      setSelected({
        ...selected,
        answers: selected.answers.filter((a) => a._id !== aid),
      });
    } catch (err) {
      console.error("Delete Answer Error:", err);
      alert("Failed to delete answer");
    }
  };

  // ✅ Filtered questions
  const filtered = questions.filter(
    (q) =>
      q.title?.toLowerCase().includes(query.toLowerCase()) ||
      q.userId?.name?.toLowerCase().includes(query.toLowerCase()) ||
      q.userId?.email?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-xl font-semibold text-slate-900">
          Forum Management
        </h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or user..."
              className="pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={fetchQuestions}
            className="px-3 py-2 rounded-lg border text-sm hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>
      </div>

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
              <th className="text-left px-4 py-3">Question</th>
              <th className="text-left px-4 py-3">User</th>
              <th className="text-left px-4 py-3">Posted</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-6 text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-indigo-600 mx-auto" />
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  No forum questions found.
                </td>
              </tr>
            ) : (
              filtered.map((q) => (
                <tr key={q._id} className="border-t hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{q.title}</td>
                  <td className="px-4 py-3">
                    {q.userId?.name || q.userId?.email || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-500 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-400" />
                    {new Date(q.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2">
                    <button
                      onClick={() => openQuestion(q._id)}
                      className="px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1 hover:bg-slate-50"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(q._id)}
                      className="px-3 py-1.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
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
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {selected?.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {selected?.userId?.name ||
                      selected?.userId?.email ||
                      "Unknown user"}
                  </p>

                  <p className="text-gray-700 leading-relaxed border rounded-lg bg-slate-50 p-3 mb-4">
                    {selected?.body || selected?.content || "No content available."}
                  </p>

                  {/* Answers */}
                  <h4 className="font-semibold text-gray-800 mb-2">Answers</h4>
                  {selected?.answers?.length > 0 ? (
                    <div className="space-y-3">
                      {selected.answers.map((a) => (
                        <div
                          key={a._id}
                          className="border border-gray-200 bg-gray-50 rounded-lg p-3 text-sm text-gray-700"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2 text-gray-600 mb-1">
                                <User className="w-4 h-4 text-indigo-400" />
                                {a.userId?.name ||
                                  a.userId?.email ||
                                  "Anonymous"}
                              </div>
                              <div className="flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-indigo-400" />
                                <span>{a.body || a.text || "No content"}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDeleteAnswer(a._id)}
                              className="text-red-600 hover:text-red-700 text-xs flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No answers yet.</p>
                  )}

                  {/* Delete Question */}
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => handleDeleteQuestion(selected._id)}
                      className="px-4 py-2 rounded-lg border border-red-300 text-red-700 hover:bg-red-50"
                    >
                      Delete Question
                    </button>
                    <button
                      onClick={() => setModalOpen(false)}
                      className="ml-2 px-4 py-2 rounded-lg border hover:bg-slate-50"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
