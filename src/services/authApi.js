import axios from "axios";
import Config from "../Constants/Config";

const API_URL = `${Config.API_BASE_URL}/api/auth`;

// ---------- LOGIN ----------
export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error.response?.data || { message: "Login failed" };
  }
};

// ---------- REFRESH TOKEN ----------
export const refreshAccessToken = async (refreshToken) => {
  try {
    const res = await axios.post(`${API_URL}/refresh`, { refreshToken });
    return res.data;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error.response?.data || { message: "Token refresh failed" };
  }
};

// ---------- LOGOUT ----------
export const logout = async (refreshToken, accessToken) => {
  try {
    const res = await axios.post(
      `${API_URL}/logout`,
      { refreshToken },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error.response?.data || { message: "Logout failed" };
  }
};

// ---------- GET CURRENT USER ----------
export const getCurrentUser = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error.response?.data || { message: "Failed to fetch user" };
  }
};

// ---------- REGISTER STUDENT ----------
export const registerStudent = async (formData) => {
  try {
    const res = await axios.post(`${API_URL}/register/student`, formData);
    return res.data;
  } catch (error) {
    console.error("Error registering student:", error);
    throw error.response?.data || { message: "Student registration failed" };
  }
};

// ---------- REGISTER MENTOR ----------
export const registerMentor = async (formData) => {
  try {
    const res = await axios.post(`${API_URL}/register/mentor`, formData);
    return res.data;
  } catch (error) {
    console.error("Error registering mentor:", error);
    throw error.response?.data || { message: "Mentor registration failed" };
  }
};

// ---------- REGISTER ADMIN ----------
export const registerAdmin = async (formData, token) => {
  try {
    const res = await axios.post(`${API_URL}/register/admin`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error registering admin:", error);
    throw error.response?.data || { message: "Admin registration failed" };
  }
};

// ---------- SEND ADMIN OTP ----------
export const sendAdminOtp = async (token) => {
  try {
    const res = await axios.post(`${API_URL}/admin/otp`, null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error.response?.data || { message: "Failed to send OTP" };
  }
};

// ---------- VERIFY EMAIL ----------
export const verifyEmail = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/verify-email/${token}`);
    return res.data;
  } catch (error) {
    console.error("Error verifying email:", error);
    throw error.response?.data || { message: "Email verification failed" };
  }
};

// ---------- RESEND VERIFICATION ----------
export const resendVerification = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/resend-verification`, { email });
    return res.data;
  } catch (error) {
    console.error("Error resending verification:", error);
    throw error.response?.data || { message: "Failed to resend email" };
  }
};

// ---------- PASSWORDS ----------
export const forgotPassword = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/forgot-password`, { email });
    return res.data;
  } catch (error) {
    console.error("Error sending reset link:", error);
    throw error.response?.data || { message: "Failed to send reset link" };
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const res = await axios.post(`${API_URL}/reset-password`, {
      token,
      newPassword,
    });
    return res.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error.response?.data || { message: "Password reset failed" };
  }
};

export const changePassword = async (oldPassword, newPassword, token) => {
  try {
    const res = await axios.post(
      `${API_URL}/change-password`,
      { oldPassword, newPassword },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error.response?.data || { message: "Password change failed" };
  }
};

// ---------- PROFILE ----------
export const updateProfile = async (data, token) => {
  try {
    const res = await axios.patch(`${API_URL}/profile`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error.response?.data || { message: "Profile update failed" };
  }
};

export const deleteAccount = async (token) => {
  try {
    const res = await axios.delete(`${API_URL}/account`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error.response?.data || { message: "Account deletion failed" };
  }
};

// ---------- CLEAR LOCAL AUTH ----------
export const clearAuth = () => {
  localStorage.clear();
};
