import React from "react";
import { useNavigate } from "react-router-dom";

const NeedGuidance = () => {
  const navigate = useNavigate();

  const handleAskQuestion = () => {
    navigate("/qa"); // navigates to Q&A page
  };

  return (
    <div className="mt-12 p-6 sm:p-8 bg-black text-white rounded-lg text-center mx-4 sm:mx-8">
      <h4 className="text-base sm:text-lg font-semibold">Need Guidance?</h4>
      <p className="text-gray-300 mb-3 text-sm sm:text-base">
        Ask questions to our verified mentors
      </p>
      <button
        onClick={handleAskQuestion}
        className="bg-white text-black px-4 sm:px-6 py-2 cursor-pointer sm:py-3 rounded font-medium hover:bg-gray-200 text-sm sm:text-base"
      >
        Ask a Question
      </button>
    </div>
  );
};

export default NeedGuidance;
