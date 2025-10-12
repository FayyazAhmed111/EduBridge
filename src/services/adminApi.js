import axios from "axios";
import Config from "../Constants/Config";

const API = axios.create({
  baseURL: `${Config.API_BASE_URL}`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ----------------------------------------------------
// USERS MANAGEMENT
// ----------------------------------------------------
export const listUsers = async () => API.get("/api/admin/users");
export const getUserById = async (id) => API.get(`/api/admin/users/${id}`);
export const deleteUser = async (id) => API.delete(`/api/admin/users/${id}`);
export const restoreUser = async (id) =>
  API.patch(`/api/admin/users/${id}/restore`);
export const suspendUser = async (body) => API.post("/api/admin/suspend", body);
export const unsuspendUser = async (body) =>
  API.post("/api/admin/unsuspend", body);

// ----------------------------------------------------
// MENTORS
// ----------------------------------------------------
export const listMentors = async () => API.get("/api/admin/mentors");
export const getMentorById = async (id) => API.get(`/api/admin/mentors/${id}`);
export const approveMentor = async (id) =>
  API.patch(`/api/admin/mentors/${id}/approve`);
export const rejectMentor = async (id) =>
  API.patch(`/api/admin/mentors/${id}/reject`);

// ----------------------------------------------------
// FORUM MODERATION
// ----------------------------------------------------

export const getAllQuestions = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/questions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching forum questions:", error);
    throw error.response?.data || { message: "Failed to load questions" };
  }
};

export const getQuestionDetails = async (id, token) => {
  try {
    const res = await axios.get(`${API_URL}/questions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching question details:", error);
    throw error.response?.data || { message: "Failed to load question" };
  }
};


export const deleteQuestion = async (id, token) => {
  try {
    const res = await axios.delete(`${API_URL}/questions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error.response?.data || { message: "Failed to delete question" };
  }
};


export const deleteAnswer = async (aid, token) => {
  try {
    const res = await axios.delete(`${API_URL}/answers/${aid}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting answer:", error);
    throw error.response?.data || { message: "Failed to delete answer" };
  }
};


// ----------------------------------------------------
// SCHOLARSHIPS
// ----------------------------------------------------
export const listScholarships = () => API.get("/api/scholarships");
// ----------------------------------------------------
// AUDIT LOGS
// ----------------------------------------------------
export const listAuditLogs = async () => API.get("/api/admin/audit");
export const getUserAuditLogs = async (id) =>
  API.get(`/api/admin/audit/user/${id}`);
export const exportAuditLogs = async () =>
  API.get("/api/admin/audit/export", { responseType: "blob" });

// ----------------------------------------------------
// DASHBOARD STATS
// ----------------------------------------------------
export const getDashboardStats = async () => API.get("/api/admin/stats");

// ----------------------------------------------------
// NOTIFICATIONS
// ----------------------------------------------------
export const sendNotification = async (body) =>
  API.post("/api/admin/notify", body);

// ----------------------------------------------------
// ADMIN CREATION (EMAIL OTP)
// ----------------------------------------------------

// Step 1: Send OTP to new admin email
export const sendAdminOtp = async (body) => API.post("/api/admin/otp", body);

// Step 2: Register admin using OTP
export const createAdmin = async (body) =>
  API.post("/api/auth/register/admin", body);

// ----------------------------------------------------
// AUTH HELPERS
// ----------------------------------------------------
export const adminLogin = async (credentials) =>
  API.post("/api/auth/login", credentials);
export const adminLogout = async () => API.post("/api/auth/logout");
export const refreshToken = async (token) =>
  API.post("/api/auth/refresh", { token });

// ----------------------------------------------------
// CONTACT MESSAGES
// ----------------------------------------------------
export const getContactMessages = async () => API.get("/api/contact");
export const markContactReviewed = async (id) =>
  API.put(`/api/contact/${id}/review`);

// ----------------------------------------------------
// TESTIMONIALS (optional moderation)
// ----------------------------------------------------
export const listTestimonials = async () => API.get("/api/testimonials");
export const approveTestimonial = async (id) =>
  API.put(`/api/testimonials/${id}/approve`);
export const rejectTestimonial = async (id) =>
  API.put(`/api/testimonials/${id}/reject`);

// ----------------------------------------------------
