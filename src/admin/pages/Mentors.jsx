import React, { useState } from "react";

export default function Mentors() {
  const [mentors, setMentors] = useState([
    { id: 1, name: "Ali Khan", subject: "Mathematics", status: "Approved" },
    { id: 2, name: "Sara Malik", subject: "Science", status: "Pending" },
    { id: 3, name: "John Doe", subject: "English", status: "Suspended" },
  ]);

  const toggleStatus = (id, newStatus) => {
    setMentors(
      mentors.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Mentors</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mentors.map((mentor) => (
              <tr key={mentor.id} className="border-t dark:border-gray-700">
                <td className="px-4 py-3">{mentor.name}</td>
                <td className="px-4 py-3">{mentor.subject}</td>
                <td
                  className={`px-4 py-3 font-medium ${
                    mentor.status === "Approved"
                      ? "text-green-500"
                      : mentor.status === "Suspended"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {mentor.status}
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => toggleStatus(mentor.id, "Approved")}
                    className="px-3 py-1 bg-green-500 text-white rounded-md text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => toggleStatus(mentor.id, "Suspended")}
                    className="px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                  >
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
