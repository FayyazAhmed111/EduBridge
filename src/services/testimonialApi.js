// src/services/testimonialApi.js
import axios from "axios";
import Config from "../Constants/Config";

const API_URL = `${Config.API_BASE_URL}/api/testimonials`;

// Get all approved testimonials (or all for admin)
export const getTestimonials = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Add a testimonial (student only)
export const addTestimonial = async (message, token) => {
  const res = await axios.post(
    API_URL,
    { message },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
