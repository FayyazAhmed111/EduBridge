// import React from "react";
// import Navbar from "../Components/Navbar";
// import { Link } from "react-router-dom";

// const SuccessStoriesPage = () => {
//   const stories = [
//     {
//       id: 1,
//       author: "Sarah Chen",
//       title: "How I Got a Full Scholarship to MIT",
//       description:
//         "From a small town university to MIT with a fully funded scholarship. I share my timeline, SOP draft, and tips for interviews...",
//       tag: "Fully Funded",
//       time: "2 days ago",
//       comments: 24,
//     },
//     {
//       id: 2,
//       author: "Ahmed Khan",
//       title: "Half Scholarship Experience at Oxford",
//       description:
//         "Securing a half scholarship at Oxford was challenging but achievable. I explain how I prepared my research proposal, handled interviews, and funding...",
//       tag: "Half Scholarship",
//       time: "1 week ago",
//       comments: 18,
//     },
//     {
//       id: 3,
//       author: "Maria Rodriguez",
//       title: "Exchange Program Success Story",
//       description:
//         "My semester abroad changed everything. Here’s my guide on finding exchange programs, financial support, and cultural adjustments...",
//       tag: "Exchange",
//       time: "2 weeks ago",
//       comments: 31,
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />

//       <div className="max-w-5xl mx-auto px-6 py-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">Success Stories</h2>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//             Share My Story
//           </button>
//         </div>

//         {/* Story List */}
//         <div className="space-y-6">
//           {stories.map((story) => (
//             <div
//               key={story.id}
//               className="border rounded-lg p-6 shadow-sm hover:shadow-md transition"
//             >
//               <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-semibold">{story.title}</h3>
//                 <span className="text-xs bg-gray-100 px-2 py-1 rounded">
//                   {story.tag}
//                 </span>
//               </div>
//               <p className="text-gray-600 mt-3">{story.description}</p>
//               <div className="flex justify-between text-xs text-gray-500 mt-4">
//                 <span>
//                   by {story.author} • {story.time}
//                 </span>
//                 <span>💬 {story.comments}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Back Button */}
//         <div className="mt-8">
//          <Link
//   to="/dashboard"
//   className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
// >
//   ← Back to Dashboard
// </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuccessStoriesPage;



import React from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

const SuccessStoriesPage = () => {
  const stories = [
    {
      id: 1,
      author: "Sarah Chen",
      title: "How I Got a Full Scholarship to MIT",
      description:
        "From a small town university to MIT with a fully funded scholarship. I share my timeline, SOP draft, and tips for interviews...",
      tag: "Fully Funded",
      time: "2 days ago",
      comments: 24,
    },
    {
      id: 2,
      author: "Ahmed Khan",
      title: "Half Scholarship Experience at Oxford",
      description:
        "Securing a half scholarship at Oxford was challenging but achievable. I explain how I prepared my research proposal, handled interviews, and funding...",
      tag: "Half Scholarship",
      time: "1 week ago",
      comments: 18,
    },
    {
      id: 3,
      author: "Maria Rodriguez",
      title: "Exchange Program Success Story",
      description:
        "My semester abroad changed everything. Here’s my guide on finding exchange programs, financial support, and cultural adjustments...",
      tag: "Exchange",
      time: "2 weeks ago",
      comments: 31,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* <Navbar /> */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 space-y-3 sm:space-y-0">
          <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
            Success Stories
          </h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto">
            Share My Story
          </button>
        </div>

        {/* Story List */}
        <div className="space-y-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="border rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {story.title}
                </h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded self-start sm:self-auto">
                  {story.tag}
                </span>
              </div>
              <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">
                {story.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500 mt-4 gap-1 sm:gap-0">
                <span>
                  by {story.author} • {story.time}
                </span>
                <span>💬 {story.comments}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center sm:text-left">
          <Link
            to="/"
            className="inline-block bg-black text-white px-4 py-2 rounded cursor-pointer"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoriesPage;

