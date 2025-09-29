// import React from "react";
// import Navbar from "../Components/Navbar";
// import WelcomeSection from "../Components/WelcomeSection";
// import SuccessStories from "../Components/SuccessStories";
// import Opportunities from "../Components/Oppertunities";
// import NeedGuidance from "../Components/Needguidance";

// const Dashboard = () => {
//   const successStories = [
//     {
//       id: 1,
//       author: "Sarah Chen",
//       title: "How I Got a Full Scholarship to MIT",
//       description:
//         "My journey from a small town university to MIT with a full scholarship. Here are the steps I took...",
//       tag: "Fully Funded",
//       time: "2 days ago",
//       comments: 24,
//     },
//     {
//       id: 2,
//       author: "Ahmed Khan",
//       title: "Half Scholarship Experience at Oxford",
//       description:
//         "Securing a half scholarship at Oxford was challenging but achievable. Let me share my strategy...",
//       tag: "Half Scholarship",
//       time: "1 week ago",
//       comments: 18,
//     },
//     {
//       id: 3,
//       author: "Maria Rodriguez",
//       title: "Exchange Program Success Story",
//       description:
//         "My semester abroad changed everything. Here's how I made it happen with limited resources...",
//       tag: "Exchange",
//       time: "2 weeks ago",
//       comments: 31,
//     },
//   ];

//   const opportunities = [
//     {
//       id: 1,
//       title: "Fulbright Scholarship Program",
//       provider: "US Department of State",
//       tag: "Fully Funded",
//       location: "United States",
//       details: "Full funding + stipend",
//       deadline: "10/15/2024",
//     },
//     {
//       id: 2,
//       title: "Erasmus+ Masters Programme",
//       provider: "European Union",
//       tag: "Partially Funded",
//       location: "Europe",
//       details: "€1,400/month",
//       deadline: "12/1/2024",
//     },
//     {
//       id: 3,
//       title: "DAAD Research Grants",
//       provider: "German Academic Exchange Service",
//       tag: "Research Grant",
//       location: "Germany",
//       details: "€1,200/month",
//       deadline: "11/30/2024",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <WelcomeSection />
//       <div className="grid grid-cols-3 gap-8 px-8">
//         <SuccessStories stories={successStories} />
//         <Opportunities opportunities={opportunities} />
//       </div>
//       <NeedGuidance />
//     </div>
//   );
// };

// export default Dashboard;



import React from "react";
import Navbar from "../Components/Navbar";
import WelcomeSection from "../Components/WelcomeSection";
import SuccessStories from "../Components/SuccessStories";
import Opportunities from "../Components/Oppertunities";
import NeedGuidance from "../Components/Needguidance";

const Dashboard = () => {
  const successStories = [
    {
      id: 1,
      author: "Sarah Chen",
      title: "How I Got a Full Scholarship to MIT",
      description:
        "My journey from a small town university to MIT with a full scholarship. Here are the steps I took...",
      tag: "Fully Funded",
      time: "2 days ago",
      comments: 24,
    },
    {
      id: 2,
      author: "Ahmed Khan",
      title: "Half Scholarship Experience at Oxford",
      description:
        "Securing a half scholarship at Oxford was challenging but achievable. Let me share my strategy...",
      tag: "Half Scholarship",
      time: "1 week ago",
      comments: 18,
    },
    {
      id: 3,
      author: "Maria Rodriguez",
      title: "Exchange Program Success Story",
      description:
        "My semester abroad changed everything. Here's how I made it happen with limited resources...",
      tag: "Exchange",
      time: "2 weeks ago",
      comments: 31,
    },
  ];

  const opportunities = [
    {
      id: 1,
      title: "Fulbright Scholarship Program",
      provider: "US Department of State",
      tag: "Fully Funded",
      location: "United States",
      details: "Full funding + stipend",
      deadline: "10/15/2024",
    },
    {
      id: 2,
      title: "Erasmus+ Masters Programme",
      provider: "European Union",
      tag: "Partially Funded",
      location: "Europe",
      details: "€1,400/month",
      deadline: "12/1/2024",
    },
    {
      id: 3,
      title: "DAAD Research Grants",
      provider: "German Academic Exchange Service",
      tag: "Research Grant",
      location: "Germany",
      details: "€1,200/month",
      deadline: "11/30/2024",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* <Navbar /> */}
      <WelcomeSection />

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
        {/* Success Stories takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <SuccessStories stories={successStories} />
        </div>

        {/* Opportunities section */}
        <div>
          <Opportunities opportunities={opportunities} />
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <NeedGuidance />
      </div>
    </div>
  );
};

export default Dashboard;
