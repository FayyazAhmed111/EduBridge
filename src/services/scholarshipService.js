// import Config from "../Constants/Config";

// export const fetchScholarships = async () => {
//   try {
//     const token = localStorage.getItem("refreshToken");

//     const res = await fetch(`${Config.API_BASE_URL}/api/scholarships`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!res.ok) throw new Error("Failed to fetch scholarships");
//     return await res.json();
//   } catch (err) {
//     console.error("Error loading scholarships:", err);
//     return [];
//   }
// };

import Config from "../Constants/Config";

export const fetchScholarships = async (query = "") => {
  try {
    const baseUrl = `${Config.API_BASE_URL}/api/scholarships`;
    const url = query
      ? `${baseUrl}/search?q=${encodeURIComponent(query)}`
      : baseUrl;

    const token = localStorage.getItem("refreshToken");

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!res.ok) throw new Error("Failed to fetch scholarships");

    const data = await res.json();
    return data.items || data;
  } catch (err) {
    console.error("Error loading scholarships:", err);
    return [];
  }
};
