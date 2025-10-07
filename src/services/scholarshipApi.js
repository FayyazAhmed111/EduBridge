import Config from "../Constants/Config";

/* ============================================================
   GET ALL SCHOLARSHIPS
   ============================================================ */
export const getAllScholarships = async () => {
  try {
    const token = localStorage.getItem("accessToken"); 

    const res = await fetch(`${Config.API_BASE_URL}/api/scholarships`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch scholarships");
    }

    const data = await res.json();
    return data.items || data;
  } catch (err) {
    console.error("Error fetching scholarships:", err);
    throw err;
  }
};

/* ============================================================
   SEARCH SCHOLARSHIPS
   ============================================================ */
export const searchScholarships = async (query = "") => {
  try {
    const url = query
      ? `${Config.API_BASE_URL}/api/scholarships/search?q=${encodeURIComponent(
          query
        )}`
      : `${Config.API_BASE_URL}/api/scholarships/search`;

    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Search request failed");
    }

    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error("Error searching scholarships:", err);
    throw err;
  }
};

/* ============================================================
   GET SUGGESTED SCHOLARSHIPS (FOR STUDENTS)
   ============================================================ */
export const getSuggestedScholarships = async () => {
  try {
    const token = localStorage.getItem("refreshToken");
    if (!token) throw new Error("Not authenticated");

    const res = await fetch(
      `${Config.API_BASE_URL}/api/scholarships/suggested`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch suggested scholarships");
    }

    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error("Error loading suggested scholarships:", err);
    throw err;
  }
};
