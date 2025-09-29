// import React, { useState } from "react";
// import Navbar from "../Components/Navbar";

// const QAPage = () => {
//   const [questions, setQuestions] = useState({
//     mentor1: [
//       { id: 1, student: "Ali", text: "How did you prepare your SOP?" },
//       { id: 2, student: "Sana", text: "What tips helped you for interviews?" },
//     ],
//     mentor2: [
//       { id: 1, student: "John", text: "How to apply for Erasmus without IELTS?" },
//     ],
//   });

//   const [newQuestion, setNewQuestion] = useState("");
//   const [selectedMentor, setSelectedMentor] = useState(null);

//   const mentors = [
//     { id: "mentor1", name: "Sarah Chen", expertise: "MIT (Full Scholarship)" },
//     { id: "mentor2", name: "Ahmed Khan", expertise: "Oxford (Half Scholarship)" },
//   ];

//   const handleAskQuestion = (mentorId) => {
//     if (newQuestion.trim() === "") return;
//     const updated = { ...questions };
//     updated[mentorId] = [
//       ...(updated[mentorId] || []),
//       { id: Date.now(), student: "You", text: newQuestion },
//     ];
//     setQuestions(updated);
//     setNewQuestion("");
//     setSelectedMentor(null);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />

//       <div className="max-w-5xl mx-auto px-6 py-8">
//         {/* Header */}
//         <h2 className="text-2xl font-bold mb-6">Q&A / Mentors</h2>

//         {/* Mentor Sections */}
//         {mentors.map((mentor) => (
//           <div
//             key={mentor.id}
//             className="border rounded-lg p-6 mb-6 shadow-sm hover:shadow-md transition"
//           >
//             {/* Mentor Info */}
//             <div className="flex justify-between items-center mb-4">
//               <div>
//                 <h3 className="text-lg font-semibold">{mentor.name}</h3>
//                 <p className="text-sm text-gray-600">{mentor.expertise}</p>
//               </div>
//               <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
//                 ✅ Verified Mentor
//               </span>
//             </div>

//             {/* Questions */}
//             <div className="space-y-3">
//               {(questions[mentor.id] || []).map((q) => (
//                 <div
//                   key={q.id}
//                   className="bg-gray-50 p-3 rounded border text-sm"
//                 >
//                   <strong>{q.student}:</strong> {q.text}
//                 </div>
//               ))}
//             </div>

//             {/* Ask a Question */}
//             {selectedMentor === mentor.id ? (
//               <div className="mt-4 flex">
//                 <input
//                   type="text"
//                   value={newQuestion}
//                   onChange={(e) => setNewQuestion(e.target.value)}
//                   placeholder="Type your question..."
//                   className="flex-grow border rounded-l px-3 py-2 text-sm"
//                 />
//                 <button
//                   onClick={() => handleAskQuestion(mentor.id)}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-r text-sm hover:bg-blue-700"
//                 >
//                   Submit
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => setSelectedMentor(mentor.id)}
//                 className="mt-4 text-sm text-blue-600 hover:underline"
//               >
//                 Ask a Question →
//               </button>
//             )}
//           </div>
//         ))}

//         {/* Back Button */}
//         <div className="mt-8">
//           <a
//             href="/"
//             className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
//           >
//             ← Back to Dashboard
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QAPage;





import React, { useState } from "react";
import Navbar from "../Components/Navbar";

const QAPage = () => {
  const [questions, setQuestions] = useState({
    mentor1: [
      { id: 1, student: "Ali", text: "How did you prepare your SOP?" },
      { id: 2, student: "Sana", text: "What tips helped you for interviews?" },
    ],
    mentor2: [
      { id: 1, student: "John", text: "How to apply for Erasmus without IELTS?" },
    ],
  });

  const [newQuestion, setNewQuestion] = useState("");
  const [selectedMentor, setSelectedMentor] = useState(null);

  const mentors = [
    { id: "mentor1", name: "Sarah Chen", expertise: "MIT (Full Scholarship)" },
    { id: "mentor2", name: "Ahmed Khan", expertise: "Oxford (Half Scholarship)" },
  ];

  const handleAskQuestion = (mentorId) => {
    if (newQuestion.trim() === "") return;
    const updated = { ...questions };
    updated[mentorId] = [
      ...(updated[mentorId] || []),
      { id: Date.now(), student: "You", text: newQuestion },
    ];
    setQuestions(updated);
    setNewQuestion("");
    setSelectedMentor(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* <Navbar /> */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
          Q&A / Mentors
        </h2>

        {/* Mentor Sections */}
        {mentors.map((mentor) => (
          <div
            key={mentor.id}
            className="border rounded-xl p-5 sm:p-6 mb-6 shadow-sm hover:shadow-md transition bg-white"
          >
            {/* Mentor Info */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold">{mentor.name}</h3>
                <p className="text-sm sm:text-base text-gray-600">{mentor.expertise}</p>
              </div>
              <span className="text-xs sm:text-sm bg-green-100 text-green-700 px-2 py-1 rounded self-center sm:self-auto">
                ✅ Verified Mentor
              </span>
            </div>

            {/* Questions */}
            <div className="space-y-3">
              {(questions[mentor.id] || []).map((q) => (
                <div
                  key={q.id}
                  className="bg-gray-50 p-3 sm:p-4 rounded-lg border text-sm sm:text-base"
                >
                  <strong>{q.student}:</strong> {q.text}
                </div>
              ))}
            </div>

            {/* Ask a Question */}
            {selectedMentor === mentor.id ? (
              <div className="mt-4 flex flex-col sm:flex-row">
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-grow border rounded-md sm:rounded-l-md sm:rounded-r-none px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleAskQuestion(mentor.id)}
                  className="mt-2 sm:mt-0 sm:ml-1 bg-blue-600 text-white px-4 py-2 rounded-md sm:rounded-l-none text-sm sm:text-base hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSelectedMentor(mentor.id)}
                className="mt-4 text-sm sm:text-base text-blue-600 hover:underline"
              >
                Ask a Question →
              </button>
            )}
          </div>
        ))}

        {/* Back Button */}
        <div className="mt-8 text-center sm:text-left">
          <a
            href="/"
            className="inline-block bg-black text-white px-4 py-2 rounded text-sm sm:text-base cursor-pointer"
          >
            ← Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default QAPage;
