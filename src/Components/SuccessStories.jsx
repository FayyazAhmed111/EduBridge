// import React from "react";

// const tagColors = {
//   "Fully Funded": "bg-green-100 text-green-700",
//   "Half Scholarship": "bg-blue-100 text-blue-700",
//   Exchange: "bg-purple-100 text-purple-700",
// };

// const SuccessStories = ({ stories }) => {
//   return (
//     <div className="col-span-2">
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="text-lg font-semibold">Latest Success Stories</h3>
//         <button className="text-blue-600 hover:underline text-sm">
//           View All →
//         </button>
//       </div>
//       <p className="text-sm text-gray-500 mb-4">
//         Learn from seniors who made it abroad
//       </p>
//       <div className="space-y-4">
//         {stories.map((story) => (
//           <div
//             key={story.id}
//             className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
//           >
//             <div className="flex justify-between items-start">
//               <h4 className="font-medium">{story.title}</h4>
//               <span
//                 className={`text-xs px-2 py-1 rounded ${tagColors[story.tag]}`}
//               >
//                 {story.tag}
//               </span>
//             </div>
//             <p className="text-sm text-gray-600 mt-2">{story.description}</p>
//             <div className="flex justify-between text-xs text-gray-500 mt-3">
//               <span>
//                 by {story.author} • {story.time}
//               </span>
//               <span>💬 {story.comments}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SuccessStories;


import React from "react";
import { Link } from "react-router-dom";

const tagColors = {
  "Fully Funded": "bg-green-100 text-green-700",
  "Half Scholarship": "bg-blue-100 text-blue-700",
  Exchange: "bg-purple-100 text-purple-700",
};

const SuccessStories = ({ stories }) => {
  // Dummy data (if no stories are passed as props)
  const sampleStories = [
    {
      id: 1,
      title: "Ayesha Khan – From Karachi to Oxford University",
      tag: "Fully Funded",
      description:
        "Ayesha secured a full scholarship through the Chevening program and is now pursuing her Master’s in Public Policy at Oxford University.",
      author: "Ayesha Khan",
      time: "2 weeks ago",
      comments: 18,
    },
    {
      id: 2,
      title: "Bilal Ahmed – Exchange Semester in Germany",
      tag: "Exchange",
      description:
        "Bilal was selected for the DAAD student exchange program and spent a semester studying Computer Science in Berlin.",
      author: "Bilal Ahmed",
      time: "1 month ago",
      comments: 9,
    },
    {
      id: 3,
      title: "Sana Malik – Half Scholarship for Data Science in the USA",
      tag: "Half Scholarship",
      description:
        "Sana earned a partial scholarship at the University of Michigan for her Master’s in Data Science after months of preparation.",
      author: "Sana Malik",
      time: "3 days ago",
      comments: 25,
    },
  ];

  const displayStories = stories?.length ? stories : sampleStories;

  return (
    <div className="col-span-2 w-full px-4 sm:px-6 lg:px-0">
      {/* Heading + View All */}
      <div className="flex flex-wrap justify-between items-center mb-3">
        <h3 className="text-base sm:text-lg font-bold">
          Latest Success Stories
        </h3>
        <Link
          to="/stories"
          className="text-blue-600 hover:underline text-sm sm:text-base"
        >
          View All Success Stories →
        </Link>
      </div>

      <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
        Learn from seniors who made it abroad
      </p>

      {/* Stories List */}
      <div className="space-y-3 sm:space-y-4">
        {displayStories.map((story) => (
          <div
            key={story.id}
            className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
              <h4 className="font-medium text-sm sm:text-base">
                {story.title}
              </h4>
              <span
                className={`text-[10px] sm:text-xs px-2 py-1 rounded self-start sm:self-auto ${tagColors[story.tag]}`}
              >
                {story.tag}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
              {story.description}
            </p>

            <div className="flex flex-col sm:flex-row sm:justify-between text-[11px] sm:text-xs text-gray-500 mt-2 sm:mt-3 gap-1 sm:gap-0">
              <span>
                by {story.author} • {story.time}
              </span>
              <span>💬 {story.comments}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;
