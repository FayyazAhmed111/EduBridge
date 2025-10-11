import axios from "axios";
import Config from "../Constants/Config";

const API_URL = `${Config.API_BASE_URL}/api/scholarships`;

// ---------- GET ALL ----------
export const getAllScholarships = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await axios.get(`${API_URL}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return res.data.items || res.data;
  } catch (error) {
    console.error("Error fetching scholarships:", error);
    throw error.response?.data || { message: "Failed to fetch scholarships" };
  }
};

// ---------- SEARCH ----------
export const searchScholarships = async (query = "") => {
  try {
    const url = query
      ? `${API_URL}/search?q=${encodeURIComponent(query)}`
      : `${API_URL}/search`;
    const res = await axios.get(url);
    return res.data.items || [];
  } catch (error) {
    console.error("Error searching scholarships:", error);
    throw error.response?.data || { message: "Search request failed" };
  }
};

// ---------- SUGGESTED (Students) ----------
export const getSuggestedScholarships = async (token) => {
  const res = await axios.get(`${API_URL}/suggested`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
