// import React, { useState, useEffect } from "react";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";

// const QAPage = () => {
//   const [questions, setQuestions] = useState([
//     {
//       id: 1,
//       title: "How did you prepare your SOP?",
//       student: "Ali",
//       answers: [
//         { id: 1, mentor: "Sarah Chen", text: "I structured it around my personal story." },
//       ],
//     },
//     {
//       id: 2,
//       title: "What tips helped you for interviews?",
//       student: "Sana",
//       answers: [{ id: 1, mentor: "Ahmed Khan", text: "Mock interviews helped a lot." }],
//     },
//     {
//       id: 3,
//       title: "How to apply for Erasmus without IELTS?",
//       student: "John",
//       answers: [
//         { id: 1, mentor: "Sarah Chen", text: "Some programs accept alternatives like Duolingo Test." },
//       ],
//     },
//   ]);

//   const [selectedQuestion, setSelectedQuestion] = useState(null);
//   const [newAnswer, setNewAnswer] = useState("");
//   const [newQuestion, setNewQuestion] = useState("");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userEmail, setUserEmail] = useState("");
//   const [errorModal, setErrorModal] = useState(false);

//   useEffect(() => {
//     const loggedIn = localStorage.getItem("isLoggedIn") === "false";
//     const email = localStorage.getItem("userEmail");
//     setIsLoggedIn(loggedIn);
//     if (loggedIn && email) setUserEmail(email);
//   }, []);

//   // ✅ Add Question Logic
//   const handleAddQuestion = () => {
//     if (!isLoggedIn) {
//       setErrorModal(true);
//       return;
//     }
//     if (!newQuestion.trim()) return;

//     const newQ = {
//       id: Date.now(),
//       title: newQuestion,
//       student: userEmail || "You",
//       answers: [],
//     };

//     setQuestions([newQ, ...questions]); // put latest on top
//     setNewQuestion("");
//   };

//   // ✅ Add Answer Logic
//   const handleAddAnswer = () => {
//     if (!isLoggedIn) {
//       setErrorModal(true);
//       return;
//     }
//     if (!newAnswer.trim() || !selectedQuestion) return;

//     const updated = questions.map((q) =>
//       q.id === selectedQuestion.id
//         ? {
//             ...q,
//             answers: [
//               ...q.answers,
//               { id: Date.now(), mentor: userEmail || "You", text: newAnswer },
//             ],
//           }
//         : q
//     );

//     setQuestions(updated);
//     setNewAnswer("");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <Navbar />

//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 text-center">
//         <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
//           Community Q&A Forum
//         </h1>
//         <p className="max-w-2xl mx-auto text-base sm:text-lg text-blue-100">
//           Browse questions from students & mentors. Share knowledge, learn, and grow together.
//         </p>
//       </section>

//       {/* Forum Content */}
//       <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
//         {/* Ask Question */}
//         <div className="flex gap-2 mb-8">
//           <input
//             type="text"
//             value={newQuestion}
//             onChange={(e) => setNewQuestion(e.target.value)}
//             placeholder="Ask a new question..."
//             className="flex-grow border rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleAddQuestion}
//             className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
//           >
//             Ask
//           </button>
//         </div>

//         {/* Questions List */}
//         <ul className="space-y-4">
//           {questions.map((q) => (
//             <li
//               key={q.id}
//               className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition cursor-pointer text-left"
//               onClick={() => setSelectedQuestion(q)}
//             >
//               <h3 className="text-lg font-semibold text-gray-800">{q.title}</h3>
//               <p className="text-xs text-gray-500 mt-1">Asked by {q.student}</p>
//               <p className="text-xs text-gray-400 mt-2">{q.answers.length} answers</p>
//             </li>
//           ))}
//         </ul>
//       </main>

//       {/* Question Modal */}
//       {selectedQuestion && (
//         <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
//           <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
//             {/* Close */}
//             <button
//               className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
//               onClick={() => setSelectedQuestion(null)}
//             >
//               ✕
//             </button>

//             {/* Question */}
//             <h2 className="text-xl font-bold text-gray-800">{selectedQuestion.title}</h2>
//             <p className="text-sm text-gray-500 mb-4">Asked by {selectedQuestion.student}</p>

//             {/* Answers */}
//             <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
//               {selectedQuestion.answers.map((ans) => (
//                 <div key={ans.id} className="p-3 border rounded-lg bg-gray-50">
//                   <strong>{ans.mentor}:</strong> {ans.text}
//                 </div>
//               ))}
//               {selectedQuestion.answers.length === 0 && (
//                 <p className="text-sm text-gray-400">No answers yet. Be the first!</p>
//               )}
//             </div>

//             {/* Add Answer */}
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={newAnswer}
//                 onChange={(e) => setNewAnswer(e.target.value)}
//                 placeholder="Write your answer..."
//                 className="flex-grow border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 onClick={handleAddAnswer}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Error Modal */}
//       {errorModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
//           <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6 relative text-center">
//             <button
//               className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
//               onClick={() => setErrorModal(false)}
//             >
//               ✕
//             </button>
//             <div className="text-4xl text-red-500 mb-3">⚠️</div>
//             <h2 className="text-lg font-bold text-gray-800 mb-2">Login Required</h2>
//             <p className="text-gray-600 text-sm mb-4">
//               Please login to ask or answer questions.
//             </p>
//             <button
//               onClick={() => setErrorModal(false)}
//               className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
//             >
//               Okay
//             </button>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default QAPage;



// import { useState, useEffect } from "react"
// import { MessageCircle, Send, X, Plus, User } from "lucide-react"
// import Navbar from "../Components/Navbar"
// import Footer from "../Components/Footer"

// export default function QAPage() {
//   const [questions, setQuestions] = useState([
//     {
//       id: 1,
//       title: "How did you prepare your SOP?",
//       student: "Ali",
//       answers: [{ id: 1, mentor: "Sarah Chen", text: "I structured it around my personal story." }],
//     },
//     {
//       id: 2,
//       title: "What tips helped you for interviews?",
//       student: "Sana",
//       answers: [{ id: 1, mentor: "Ahmed Khan", text: "Mock interviews helped a lot." }],
//     },
//     {
//       id: 3,
//       title: "How to apply for Erasmus without IELTS?",
//       student: "John",
//       answers: [{ id: 1, mentor: "Sarah Chen", text: "Some programs accept alternatives like Duolingo Test." }],
//     },
//   ])

//   const [selectedQuestion, setSelectedQuestion] = useState(null)
//   const [newAnswer, setNewAnswer] = useState("")
//   const [newQuestion, setNewQuestion] = useState("")
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [userEmail, setUserEmail] = useState("")
//   const [errorModal, setErrorModal] = useState(false)

//   useEffect(() => {
//     const loggedIn = localStorage.getItem("isLoggedIn") === "true"
//     const email = localStorage.getItem("userEmail")
//     setIsLoggedIn(loggedIn)
//     if (loggedIn && email) setUserEmail(email)
//   }, [])

//   const handleAddQuestion = () => {
//     if (!isLoggedIn) {
//       setErrorModal(true)
//       return
//     }
//     if (!newQuestion.trim()) return

//     const newQ = {
//       id: Date.now(),
//       title: newQuestion,
//       student: userEmail || "You",
//       answers: [],
//     }

//     setQuestions([newQ, ...questions])
//     setNewQuestion("")
//   }

//   const handleAddAnswer = () => {
//     if (!isLoggedIn) {
//       setErrorModal(true)
//       return
//     }
//     if (!newAnswer.trim() || !selectedQuestion) return

//     const updated = questions.map((q) =>
//       q.id === selectedQuestion.id
//         ? {
//           ...q,
//           answers: [...q.answers, { id: Date.now(), mentor: userEmail || "You", text: newAnswer }],
//         }
//         : q,
//     )

//     setQuestions(updated)
//     setNewAnswer("")
//   }

//   const getInitials = (name) => {
//     return name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex flex-col">
//       <Navbar />

//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white py-20 px-6 overflow-hidden">
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
//         <div className="relative max-w-4xl mx-auto text-center">
//           <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">Community Q&A Forum</h1>
//           <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto text-pretty">
//             Browse questions from students & mentors. Share knowledge, learn, and grow together.
//           </p>
//         </div>
//       </section>

//       {/* Forum Content */}
//       <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
//         {/* Ask Question */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-10">
//           <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
//             Ask a Question
//           </h3>
//           <div className="flex gap-3">
//             <input
//               type="text"
//               value={newQuestion}
//               onChange={(e) => setNewQuestion(e.target.value)}
//               placeholder="What would you like to know?"
//               className="flex-grow border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//               onKeyPress={(e) => e.key === "Enter" && handleAddQuestion()}
//             />
//             <button
//               onClick={handleAddQuestion}
//               className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
//             >
//               Ask
//             </button>
//           </div>
//         </div>

//         {/* Questions List */}
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Questions</h2>
//           <div className="space-y-4">
//             {questions.map((q) => (
//               <div
//                 key={q.id}
//                 className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 cursor-pointer"
//                 onClick={() => setSelectedQuestion(q)}
//               >
//                 <div className="flex items-start gap-4">
//                   <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
//                     {getInitials(q.student)}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-lg font-semibold text-gray-900 transition-colors mb-2">
//                       {q.title}
//                     </h3>
//                     <div className="flex items-center gap-4 text-sm text-gray-600">
//                       <div className="flex items-center gap-1.5">
//                         <User className="w-4 h-4" />
//                         <span>Asked by {q.student}</span>
//                       </div>
//                       <div className="flex items-center gap-1.5 text-indigo-600 font-medium">
//                         <MessageCircle className="w-4 h-4" />
//                         <span>
//                           {q.answers.length} {q.answers.length === 1 ? "answer" : "answers"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* Question Modal */}
//       {selectedQuestion && (
//         <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
//           <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
//             {/* Header */}
//             <div className="p-6 border-b border-gray-200">
//               <button
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-colors"
//                 onClick={() => setSelectedQuestion(null)}
//               >
//                 <X className="w-5 h-5" />
//               </button>
//               <h2 className="text-2xl font-bold text-gray-900 pr-10">{selectedQuestion.title}</h2>
//               <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
//                 <User className="w-4 h-4" />
//                 <span>Asked by {selectedQuestion.student}</span>
//               </div>
//             </div>

//             {/* Answers */}
//             <div className="flex-1 overflow-y-auto p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-4">
//                 {selectedQuestion.answers.length} {selectedQuestion.answers.length === 1 ? "Answer" : "Answers"}
//               </h3>
//               <div className="space-y-4">
//                 {selectedQuestion.answers.map((ans) => (
//                   <div
//                     key={ans.id}
//                     className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-100"
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
//                         {getInitials(ans.mentor)}
//                       </div>
//                       <div className="flex-1">
//                         <p className="font-semibold text-gray-900 mb-1">{ans.mentor}</p>
//                         <p className="text-gray-700 leading-relaxed">{ans.text}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 {selectedQuestion.answers.length === 0 && (
//                   <div className="text-center py-8">
//                     <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                     <p className="text-gray-500">No answers yet. Be the first to help!</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Add Answer */}
//             <div className="p-6 border-t border-gray-200 bg-gray-50">
//               <h3 className="text-sm font-semibold text-gray-700 mb-3">Your Answer</h3>
//               <div className="flex gap-3">
//                 <input
//                   type="text"
//                   value={newAnswer}
//                   onChange={(e) => setNewAnswer(e.target.value)}
//                   placeholder="Share your knowledge..."
//                   className="flex-grow border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
//                   onKeyPress={(e) => e.key === "Enter" && handleAddAnswer()}
//                 />
//                 <button
//                   onClick={handleAddAnswer}
//                   className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
//                 >
//                   <Send className="w-4 h-4" />
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Error Modal */}
//       {errorModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200">
//           <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 relative text-center animate-in zoom-in-95 duration-200">
//             <button
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-colors"
//               onClick={() => setErrorModal(false)}
//             >
//               <X className="w-5 h-5" />
//             </button>
//             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <span className="text-3xl">⚠️</span>
//             </div>
//             <h2 className="text-xl font-bold text-gray-900 mb-2">Login Required</h2>
//             <p className="text-gray-600 mb-6">Please login to ask or answer questions in the community.</p>
//             <button
//               onClick={() => setErrorModal(false)}
//               className="w-full cursor-pointer bg-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
//             >
//               Got it
//             </button>
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   )
// }
import { useState, useEffect } from "react";
import { MessageCircle, Send, X, User } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
  getQuestions,
  getQuestionById,
  postQuestion,
  postAnswer,
} from "../services/forumApi";

export default function QAPage() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [errorModal, setErrorModal] = useState(false);

  // Fetch user info and questions
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const jwt = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole");
    const id = localStorage.getItem("userId");
    const name = localStorage.getItem("userName");

    setIsLoggedIn(loggedIn);
    setToken(jwt || "");
    setUserRole(role || "");
    setUserId(id || "");
    setUserName(name || "");

    if (loggedIn && jwt) fetchQuestions(jwt);
  }, []);

  const fetchQuestions = async (jwt) => {
    try {
      const data = await getQuestions(jwt);
      setQuestions(data);
    } catch (err) {
      console.error("Failed to load questions:", err);
    }
  };

  // Student adds question
  const handleAddQuestion = async () => {
    if (!isLoggedIn) return setErrorModal(true);
    if (userRole !== "student") return alert("Only students can ask questions.");
    if (!newQuestion.trim()) return;

    try {
      const newQ = await postQuestion(newQuestion, newQuestion, token);
      const withUser = {
        ...newQ,
        userId: {
          _id: userId,
          name: userName,
          role: "student",
        },
        answers: [],
      };
      setQuestions((prev) => [withUser, ...prev]);
      setNewQuestion("");
    } catch (err) {
      console.error("Failed to add question:", err);
    }
  };

  // Select question
  const handleSelectQuestion = async (q) => {
    try {
      const data = await getQuestionById(q._id, token);
      setSelectedQuestion(data);
    } catch (err) {
      console.error("Failed to fetch question details:", err);
    }
  };

  // Add answer (mentor or student reply)
  const handleAddAnswer = async () => {
    if (!isLoggedIn) return setErrorModal(true);
    if (!newAnswer.trim() || !selectedQuestion) return;

    try {
      const ans = await postAnswer(selectedQuestion.question._id, newAnswer, token);
      const withUser = {
        ...ans,
        userId: { _id: userId, name: userName, role: userRole },
      };

      setSelectedQuestion((prev) => ({
        ...prev,
        answers: [...(prev.answers || []), withUser],
      }));

      setQuestions((prev) =>
        prev.map((q) =>
          q._id === selectedQuestion.question._id
            ? { ...q, answers: [...(q.answers || []), withUser] }
            : q
        )
      );

      setNewAnswer("");
    } catch (err) {
      console.error("Failed to add answer:", err);
    }
  };

  // ✅ Real-world name logic
  const getDisplayName = (user) => {
    if (!user) return "Unknown";
    if (user._id === userId) return "You";
    return user.name;
  };

  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white py-20 px-6">
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Community Q&A Forum
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Browse questions from students & mentors. Share knowledge, learn, and grow together.
          </p>
        </div>
      </section>

      {/* Ask Question */}
      {userRole === "student" && (
        <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-10 max-w-5xl mx-auto w-full mt-12">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Ask a Question</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="What would you like to know?"
              className="flex-grow border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              onKeyPress={(e) => e.key === "Enter" && handleAddQuestion()}
            />
            <button
              onClick={handleAddQuestion}
              className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Ask
            </button>
          </div>
        </section>
      )}

      {/* Question List */}
      {/* <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Questions</h2>
        <div className="space-y-4">
          {questions.map((q) => (
            <div
              key={q._id}
              className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 cursor-pointer"
              onClick={() => handleSelectQuestion(q)}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                  {getInitials(q.userId?.name || "U")}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {q.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4" />
                      <span>Asked by {getDisplayName(q.userId)}</span>
                      {q.userId?.role && (
                        <span
                          className={`text-xs ml-2 px-2 py-0.5 rounded-full ${q.userId.role === "mentor"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                            }`}
                        >
                          {q.userId.role.charAt(0).toUpperCase() +
                            q.userId.role.slice(1)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-indigo-600 font-medium">
                      <MessageCircle className="w-4 h-4" />
                      <span>{q.answers?.length || 0} answers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main> */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Questions</h2>

        {/* Show login prompt if user is not logged in */}
        {!isLoggedIn ? (
          <div className="flex justify-center items-center py-10">
            <div className="bg-white/90 px-8 py-6 rounded-xl shadow text-center border">
              <p className="text-lg font-semibold text-gray-700 mb-2">
                🔒 Please login to view recent questions
              </p>
              <p className="text-sm text-gray-500">
                Sign in to browse community questions and participate in discussions.
              </p>
            </div>
          </div>
        ) : questions.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No questions found.
          </p>
        ) : (
              <div className="space-y-4">
                {questions.map((q) => (
                  <div
                    key={q._id}
                    className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 cursor-pointer"
                    onClick={() => handleSelectQuestion(q)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                        {getInitials(q.userId?.name || "U")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {q.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <User className="w-4 h-4" />
                        <span>Asked by {getDisplayName(q.userId)}</span>
                        {q.userId?.role && (
                          <span
                            className={`text-xs ml-2 px-2 py-0.5 rounded-full ${q.userId.role === "mentor"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                              }`}
                          >
                            {q.userId.role.charAt(0).toUpperCase() +
                              q.userId.role.slice(1)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-indigo-600 font-medium">
                        <MessageCircle className="w-4 h-4" />
                        <span>{q.answers?.length || 0} answers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
              </div>
        )}
      </main>

      {/* Modal for selected question */}
      {selectedQuestion && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-colors"
                onClick={() => setSelectedQuestion(null)}
              >
                <X className="w-5 h-5 cursor-pointer" />
              </button>
              <h2 className="text-2xl font-bold text-gray-900 pr-10">
                {selectedQuestion.question?.title}
              </h2>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>
                  Asked by {getDisplayName(selectedQuestion.question?.userId)}
                </span>
                {selectedQuestion.question?.userId?.role && (
                  <span
                    className={`text-xs ml-1 px-2 py-0.5 rounded-full ${selectedQuestion.question.userId.role === "mentor"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                      }`}
                  >
                    {selectedQuestion.question.userId.role.charAt(0).toUpperCase() +
                      selectedQuestion.question.userId.role.slice(1)}
                  </span>
                )}
              </div>
            </div>

            {/* Answers */}
            <div className="flex-1 overflow-y-auto p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {selectedQuestion.answers?.length || 0} Answers
              </h3>
              {selectedQuestion.answers?.map((ans) => (
                <div
                  key={ans._id}
                  className={`${ans.userId?.role === "mentor" ? "bg-blue-50" : "bg-green-50"} p-5 rounded-xl border border-indigo-100 mb-3`}
                >
                  <p className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                    {getDisplayName(ans.userId)}
                    {ans.userId?.role && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${ans.userId.role === "mentor"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                          }`}
                      >
                        {ans.userId.role.charAt(0).toUpperCase() +
                          ans.userId.role.slice(1)}
                      </span>
                    )}
                  </p>
                  <p className="text-gray-700">{ans.body}</p>
                </div>
              ))}
              {selectedQuestion.answers?.length === 0 && (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No answers yet. Be the first to help!</p>
                </div>
              )}
            </div>

            {/* Reply Box */}
            {isLoggedIn && (
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Your Reply
                </h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-grow border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    onKeyPress={(e) => e.key === "Enter" && handleAddAnswer()}
                  />
                  <button
                    onClick={handleAddAnswer}
                    className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              onClick={() => setErrorModal(false)}
            >
              <X className="w-5 h-5 cursor-pointer" />
            </button>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              ⚠️
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Login Required
            </h2>
            <p className="text-gray-600 mb-6">
              Please login to ask or answer questions in the community.
            </p>
            <button
              onClick={() => setErrorModal(false)}
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
