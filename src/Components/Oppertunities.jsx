// import React from "react";

// const tagColors = {
//   "Fully Funded": "bg-green-100 text-green-700",
//   "Partially Funded": "bg-yellow-100 text-yellow-700",
//   "Research Grant": "bg-purple-100 text-purple-700",
// };

// const Opportunities = ({ opportunities }) => {
//   return (
//     <div>
//       <h3 className="text-lg font-semibold mb-3">Available Opportunities</h3>
//       <p className="text-sm text-gray-500 mb-4">
//         Current scholarships and programs
//       </p>
//       <div className="space-y-4">
//         {opportunities.map((opp) => (
//           <div
//             key={opp.id}
//             className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
//           >
//             <div className="flex justify-between items-start">
//               <h4 className="font-medium">{opp.title}</h4>
//               <span
//                 className={`text-xs px-2 py-1 rounded ${tagColors[opp.tag]}`}
//               >
//                 {opp.tag}
//               </span>
//             </div>
//             <p className="text-sm text-gray-600">{opp.provider}</p>
//             <ul className="text-xs text-gray-500 mt-2 space-y-1">
//               <li>📍 {opp.location}</li>
//               <li>💰 {opp.details}</li>
//               <li>⏳ Deadline: {opp.deadline}</li>
//             </ul>
//             <button className="mt-3 text-sm text-blue-600 hover:underline">
//               Read More
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Opportunities;


import React from "react";
import { Link } from "react-router-dom"; // ✅ import Link

const tagColors = {
  "Fully Funded": "bg-green-100 text-green-700",
  "Partially Funded": "bg-yellow-100 text-yellow-700",
  "Research Grant": "bg-purple-100 text-purple-700",
};

const Opportunities = ({ opportunities }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-0">
      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
        Available Opportunities
      </h3>
      <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
        Current scholarships and programs
      </p>

      <div className="space-y-3 sm:space-y-4">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="border rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
              <h4 className="font-medium text-sm sm:text-base">{opp.title}</h4>
              <span
                className={`text-[10px] sm:text-xs px-2 py-1 rounded self-start sm:self-auto ${tagColors[opp.tag]}`}
              >
                {opp.tag}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-0">
              {opp.provider}
            </p>

            <ul className="text-[11px] sm:text-xs text-gray-500 mt-2 space-y-1">
              <li>📍 {opp.location}</li>
              <li>💰 {opp.details}</li>
              <li>⏳ Deadline: {opp.deadline}</li>
            </ul>

            {/* ✅ Button navigates to Scholarships page */}
            <Link
              to="/scholarships"
              className="mt-2 sm:mt-3 text-xs sm:text-sm text-blue-600 hover:underline inline-block"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Opportunities;
