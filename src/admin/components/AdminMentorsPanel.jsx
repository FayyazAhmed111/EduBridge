import React, { useEffect, useState, useMemo } from "react";
import {
  listMentors,
  getMentorById,
  approveMentor,
  rejectMentor,
} from "../../services/adminApi";
import {
  Search,
  User,
  Eye,
  Check,
  X,
  Loader2,
  FileText,
  Linkedin,
  GraduationCap,
  Briefcase,
  Languages,
} from "lucide-react";

const AdminMentorsPanel = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  // Fetch mentors
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
      `${m.name} ${m.email} ${m.mentorProfile?.highestEducation || ""} ${
        m.mentorProfile?.status || ""
      }`.toLowerCase().includes(q)
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

  // Open mentor details modal
  const openMentorModal = async (mentor) => {
    setSelectedMentor(mentor);
    setModalOpen(true);
    setModalLoading(true);
    try {
      const res = await getMentorById(mentor._id);
      setSelectedMentor(res.data);
    } catch (e) {
      setSelectedMentor({
        error: e?.response?.data?.message || "Failed to fetch details",
      });
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
              placeholder="Search mentor name, email, status..."
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
              <th className="text-left px-4 py-3">Education</th>
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
                  <td className="px-4 py-3">
                    {m.mentorProfile?.highestEducation || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded border text-xs font-semibold ${
                        m.mentorProfile?.status === "approved"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : m.mentorProfile?.status === "pending"
                          ? "bg-amber-50 border-amber-200 text-amber-700"
                          : "bg-red-50 border-red-200 text-red-700"
                      }`}
                    >
                      {m.mentorProfile?.status || "unknown"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      {m.mentorProfile?.status === "pending" && (
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

      {/* Mentor Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full relative flex flex-col">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 overflow-y-auto max-h-[80vh]">
              <h3 className="text-lg font-semibold mb-4 text-slate-800">
                Mentor Details
              </h3>

              {modalLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="animate-spin w-6 h-6 text-indigo-600" />
                </div>
              ) : selectedMentor?.error ? (
                <p className="text-red-600">{selectedMentor.error}</p>
              ) : (
                <div className="space-y-3 text-sm">
                  <Info label="Name" value={selectedMentor?.name} />
                  <Info label="Email" value={selectedMentor?.email} />
                  <Info label="Phone" value={selectedMentor?.phone} />
                  <Info label="Gender" value={selectedMentor?.gender} />
                  {selectedMentor?.mentorProfile?.highestEducation && (
                    <Info
                      label="Education"
                      value={selectedMentor.mentorProfile.highestEducation}
                    />
                  )}
                  {selectedMentor?.mentorProfile?.occupation && (
                    <Info
                      label="Occupation"
                      value={selectedMentor.mentorProfile.occupation}
                    />
                  )}
                  {selectedMentor?.mentorProfile?.organization && (
                    <Info
                      label="Organization"
                      value={selectedMentor.mentorProfile.organization}
                    />
                  )}
                  {selectedMentor?.mentorProfile?.yearsOfExperience && (
                    <Info
                      label="Experience"
                      value={`${selectedMentor.mentorProfile.yearsOfExperience} years`}
                    />
                  )}
                  {selectedMentor?.mentorProfile?.expertise?.length > 0 && (
                    <Info
                      label="Expertise"
                      value={selectedMentor.mentorProfile.expertise.join(", ")}
                    />
                  )}
                  {selectedMentor?.mentorProfile?.mentorAreas?.length > 0 && (
                    <Info
                      label="Mentor Areas"
                      value={selectedMentor.mentorProfile.mentorAreas.join(", ")}
                    />
                  )}
                  {selectedMentor?.mentorProfile?.languages?.length > 0 && (
                    <Info
                      label="Languages"
                      value={selectedMentor.mentorProfile.languages.join(", ")}
                    />
                  )}
                  {selectedMentor?.mentorProfile?.availability && (
                    <Info
                      label="Availability"
                      value={selectedMentor.mentorProfile.availability}
                    />
                  )}
                  {selectedMentor?.mentorProfile?.format && (
                    <Info
                      label="Format"
                      value={selectedMentor.mentorProfile.format}
                    />
                  )}
                  {selectedMentor?.mentorProfile?.linkedin && (
                    <a
                      href={selectedMentor.mentorProfile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 text-sm hover:underline flex items-center gap-1"
                    >
                      <Linkedin className="w-4 h-4" /> LinkedIn Profile
                    </a>
                  )}
                  {selectedMentor?.mentorProfile?.resumeUrl && (
                    <a
                      href={selectedMentor.mentorProfile.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 text-sm hover:underline flex items-center gap-1"
                    >
                      <FileText className="w-4 h-4" /> Resume
                    </a>
                  )}
                  {selectedMentor?.mentorProfile?.idDocumentUrl && (
                    <a
                      href={selectedMentor.mentorProfile.idDocumentUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 text-sm hover:underline flex items-center gap-1"
                    >
                      <FileText className="w-4 h-4" /> ID Document
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="border-t p-4 flex justify-end gap-2">
              {selectedMentor?.mentorProfile?.status === "pending" && (
                <>
                  <button
                    onClick={() => handleApprove(selectedMentor._id)}
                    className="px-3 py-1.5 rounded-lg border border-green-300 text-green-700 hover:bg-green-50 text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedMentor._id)}
                    className="px-3 py-1.5 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 text-sm"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setModalOpen(false)}
                className="px-3 py-1.5 rounded-lg border hover:bg-slate-50 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper
const Info = ({ label, value }) =>
  value ? (
    <div>
      <div className="text-slate-600 text-xs">{label}</div>
      <div className="font-medium text-slate-900">{value}</div>
    </div>
  ) : null;

export default AdminMentorsPanel;
