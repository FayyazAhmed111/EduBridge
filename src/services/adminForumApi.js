import axios from "axios";
import Config from "../Constants/Config";

const API_URL = `${Config.API_BASE_URL}/api/forum`;

// Get all forum questions (Admin)
export const getAllQuestions = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/questions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching forum questions:", error.response || error);
    throw error.response?.data || { message: "Failed to load questions" };
  }
};

// Get question details
export const getQuestionDetails = async (id, token) => {
  try {
    const res = await axios.get(`${API_URL}/questions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching question details:", error.response || error);
    throw error.response?.data || { message: "Failed to fetch question" };
  }
};

// Delete question
export const deleteQuestion = async (id, token) => {
  try {
    const res = await axios.delete(`${API_URL}/questions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting question:", error.response || error);
    throw error.response?.data || { message: "Failed to delete question" };
  }
};

// Delete answer
export const deleteAnswer = async (aid, token) => {
  try {
    const res = await axios.delete(`${API_URL}/answers/${aid}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting answer:", error.response || error);
    throw error.response?.data || { message: "Failed to delete answer" };
  }
};
