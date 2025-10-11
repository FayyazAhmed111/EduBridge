// src/services/courseApi.js
import axios from "axios";

const API_URL = "https://udemy-paid-courses-for-free-api.p.rapidapi.com/rapidapi/courses/";

const headers = {
  "x-rapidapi-key": "3471268758msha68462e984862f6p15edccjsn868d70b321c9",
  "x-rapidapi-host": "udemy-paid-courses-for-free-api.p.rapidapi.com",
};

export const getFreeCourses = async (page = 1, pageSize = 12) => {
  try {
    const res = await axios.get(API_URL, {
      params: { page, page_size: pageSize },
      headers,
    });
    return res.data.courses || [];
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }
};
