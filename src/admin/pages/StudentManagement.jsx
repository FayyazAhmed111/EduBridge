import React, { useState } from "react";

export default function Students() {
  const [students, setStudents] = useState([
    { id: 1, name: "Ayesha Noor", course: "Web Development", status: "Active" },
    { id: 2, name: "Bilal Ahmed", course: "UI/UX Design", status: "Suspended" },
    { id: 3, name: "Hamza Khan", course: "Data Science", status: "Active" },
  ]);

  const toggleStatus = (id, newStatus) => {
    setStudents(
      students.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Students</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-t dark:border-gray-700">
                <td className="px-4 py-3">{student.name}</td>
                <td className="px-4 py-3">{student.course}</td>
                <td
                  className={`px-4 py-3 font-medium ${
                    student.status === "Active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {student.status}
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => toggleStatus(student.id, "Active")}
                    className="px-3 py-1 bg-green-500 text-white rounded-md text-sm"
                  >
                    Activate
                  </button>
                  <button
                    onClick={() => toggleStatus(student.id, "Suspended")}
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
