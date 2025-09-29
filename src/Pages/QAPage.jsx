import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const QAPage = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "How did you prepare your SOP?",
      student: "Ali",
      answers: [
        { id: 1, mentor: "Sarah Chen", text: "I structured it around my personal story." },
      ],
    },
    {
      id: 2,
      title: "What tips helped you for interviews?",
      student: "Sana",
      answers: [{ id: 1, mentor: "Ahmed Khan", text: "Mock interviews helped a lot." }],
    },
    {
      id: 3,
      title: "How to apply for Erasmus without IELTS?",
      student: "John",
      answers: [
        { id: 1, mentor: "Sarah Chen", text: "Some programs accept alternatives like Duolingo Test." },
      ],
    },
  ]);

  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "false";
    const email = localStorage.getItem("userEmail");
    setIsLoggedIn(loggedIn);
    if (loggedIn && email) setUserEmail(email);
  }, []);

  // ✅ Add Question Logic
  const handleAddQuestion = () => {
    if (!isLoggedIn) {
      setErrorModal(true);
      return;
    }
    if (!newQuestion.trim()) return;

    const newQ = {
      id: Date.now(),
      title: newQuestion,
      student: userEmail || "You",
      answers: [],
    };

    setQuestions([newQ, ...questions]); // put latest on top
    setNewQuestion("");
  };

  // ✅ Add Answer Logic
  const handleAddAnswer = () => {
    if (!isLoggedIn) {
      setErrorModal(true);
      return;
    }
    if (!newAnswer.trim() || !selectedQuestion) return;

    const updated = questions.map((q) =>
      q.id === selectedQuestion.id
        ? {
            ...q,
            answers: [
              ...q.answers,
              { id: Date.now(), mentor: userEmail || "You", text: newAnswer },
            ],
          }
        : q
    );

    setQuestions(updated);
    setNewAnswer("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Community Q&A Forum
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-blue-100">
          Browse questions from students & mentors. Share knowledge, learn, and grow together.
        </p>
      </section>

      {/* Forum Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10">
        {/* Ask Question */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Ask a new question..."
            className="flex-grow border rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddQuestion}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Ask
          </button>
        </div>

        {/* Questions List */}
        <ul className="space-y-4">
          {questions.map((q) => (
            <li
              key={q.id}
              className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition cursor-pointer text-left"
              onClick={() => setSelectedQuestion(q)}
            >
              <h3 className="text-lg font-semibold text-gray-800">{q.title}</h3>
              <p className="text-xs text-gray-500 mt-1">Asked by {q.student}</p>
              <p className="text-xs text-gray-400 mt-2">{q.answers.length} answers</p>
            </li>
          ))}
        </ul>
      </main>

      {/* Question Modal */}
      {selectedQuestion && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">
            {/* Close */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setSelectedQuestion(null)}
            >
              ✕
            </button>

            {/* Question */}
            <h2 className="text-xl font-bold text-gray-800">{selectedQuestion.title}</h2>
            <p className="text-sm text-gray-500 mb-4">Asked by {selectedQuestion.student}</p>

            {/* Answers */}
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {selectedQuestion.answers.map((ans) => (
                <div key={ans.id} className="p-3 border rounded-lg bg-gray-50">
                  <strong>{ans.mentor}:</strong> {ans.text}
                </div>
              ))}
              {selectedQuestion.answers.length === 0 && (
                <p className="text-sm text-gray-400">No answers yet. Be the first!</p>
              )}
            </div>

            {/* Add Answer */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Write your answer..."
                className="flex-grow border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddAnswer}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6 relative text-center">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
              onClick={() => setErrorModal(false)}
            >
              ✕
            </button>
            <div className="text-4xl text-red-500 mb-3">⚠️</div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">Login Required</h2>
            <p className="text-gray-600 text-sm mb-4">
              Please login to ask or answer questions.
            </p>
            <button
              onClick={() => setErrorModal(false)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default QAPage;
