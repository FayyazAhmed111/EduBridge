import axios from "axios";
import Config from "../Constants/Config";

const API_URL = `${Config.API_BASE_URL}/api/forum`;

//  Get all questions
export const getQuestions = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/questions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error.response?.data || { message: "Failed to fetch questions" };
  }
};

export const getQuestionById = async (id, token) => {
  try {
    const res = await axios.get(`${API_URL}/questions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error.response?.data || { message: "Failed to fetch question" };
  }
};

//  Ask a new question
export const postQuestion = async (title, body, token) => {
  try {
    const res = await axios.post(
      `${API_URL}/questions`,
      { title, body },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error posting question:", error);
    throw error.response?.data || { message: "Failed to post question" };
  }
};

// Post an answer 
export const postAnswer = async (qid, body, token) => {
  try {
    const res = await axios.post(
      `${API_URL}/questions/${qid}/answers`,
      { body },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error posting answer:", error);
    throw error.response?.data || { message: "Failed to post answer" };
  }
};

export const acceptAnswer = async (aid, token) => {
  try {
    const res = await axios.put(
      `${API_URL}/answers/${aid}/accept`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error accepting answer:", error);
    throw error.response?.data || { message: "Failed to accept answer" };
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

//  Delete a question (Admin only)
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
