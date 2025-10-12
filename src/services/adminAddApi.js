import axios from "axios";
import Config from "../Constants/Config";

const API_URL = `${Config.API_BASE_URL}/api/auth`;

// ✅ Send OTP to new admin email
export const sendAdminInviteOtp = async (email, token) => {
  try {
    console.log("📤 Sending OTP to:", email);
    const res = await axios.post(
      `${API_URL}/admin/otp`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ OTP response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ OTP error:", error.response || error);
    throw error.response?.data || { message: "Failed to send OTP" };
  }
};

// ✅ Register admin (requires OTP)
export const registerAdmin = async (data, token) => {
  try {
    console.log("📤 Registering admin:", data);
    const res = await axios.post(`${API_URL}/register/admin`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("✅ Register response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Register error:", error.response || error);
    throw error.response?.data || { message: "Failed to register admin" };
  }
};
