import Config from "../Constants/Config";

/* ============================================================
   AUTHENTICATION
   ============================================================ */

export const login = async (email, password) => {
  try {
    const res = await fetch(`${Config.API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    return data;
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
};

export const refreshAccessToken = async (refreshToken) => {
  try {
    const res = await fetch(`${Config.API_BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Token refresh failed");

    return data;
  } catch (err) {
    console.error("Token refresh error:", err);
    throw err;
  }
};

export const logout = async (refreshToken, accessToken) => {
  try {
    const res = await fetch(`${Config.API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Logout failed");

    return data;
  } catch (err) {
    console.error("Logout error:", err);
    throw err;
  }
};

export const getCurrentUser = async (accessToken) => {
  try {
    const res = await fetch(`${Config.API_BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch user");

    return data;
  } catch (err) {
    console.error("Get user error:", err);
    throw err;
  }
};

/* ============================================================
   REGISTRATION
   ============================================================ */

export const registerStudent = async (data) => {
  try {
    const res = await fetch(
      `${Config.API_BASE_URL}/api/auth/register/student`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const result = await res.json();
    if (!res.ok)
      throw new Error(result.message || "Student registration failed");

    return result;
  } catch (err) {
    console.error("Student registration error:", err);
    throw err;
  }
};

export const registerMentor = async (data) => {
  try {
    const res = await fetch(`${Config.API_BASE_URL}/api/auth/register/mentor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok)
      throw new Error(result.message || "Mentor registration failed");

    return result;
  } catch (err) {
    console.error("Mentor registration error:", err);
    throw err;
  }
};

export const registerAdmin = async (data, token) => {
  try {
    const res = await fetch(`${Config.API_BASE_URL}/api/auth/register/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Admin registration failed");

    return result;
  } catch (err) {
    console.error("Admin registration error:", err);
    throw err;
  }
};

export const sendAdminOtp = async (token) => {
  try {
    const res = await fetch(`${Config.API_BASE_URL}/api/auth/admin/otp`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to send OTP");

    return result;
  } catch (err) {
    console.error("Send OTP error:", err);
    throw err;
  }
};

/* ============================================================
   EMAIL VERIFICATION
   ============================================================ */

export const verifyEmail = async (token) => {
  try {
    const res = await fetch(
      `${Config.API_BASE_URL}/api/auth/verify-email/${token}`,
      {
        method: "GET",
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Email verification failed");

    return data;
  } catch (err) {
    console.error("Verify email error:", err);
    throw err;
  }
};

export const resendVerification = async (email) => {
  try {
    const res = await fetch(
      `${Config.API_BASE_URL}/api/auth/resend-verification`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to resend email");

    return data;
  } catch (err) {
    console.error("Resend verification error:", err);
    throw err;
  }
};

/* ============================================================
   PASSWORD MANAGEMENT
   ============================================================ */

export const forgotPassword = async (email) => {
  try {
    const res = await fetch(`${Config.API_BASE_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to send reset link");

    return data;
  } catch (err) {
    console.error("Forgot password error:", err);
    throw err;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const res = await fetch(`${Config.API_BASE_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Password reset failed");

    return data;
  } catch (err) {
    console.error("Reset password error:", err);
    throw err;
  }
};

export const changePassword = async (oldPassword, newPassword, token) => {
  try {
    const res = await fetch(`${Config.API_BASE_URL}/api/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Password change failed");

    return data;
  } catch (err) {
    console.error("Change password error:", err);
    throw err;
  }
};

/* ============================================================
   PROFILE AND ACCOUNT MANAGEMENT
   ============================================================ */

export const updateProfile = async (data, token) => {
  try {
    const res = await fetch(`${Config.API_BASE_URL}/api/auth/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Profile update failed");

    return result;
  } catch (err) {
    console.error("Profile update error:", err);
    throw err;
  }
};

export const deleteAccount = async (token) => {
  try {
    const res = await fetch(`${Config.API_BASE_URL}/api/auth/account`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Account deletion failed");

    return result;
  } catch (err) {
    console.error("Delete account error:", err);
    throw err;
  }
};

/* ============================================================
   LOCAL LOGOUT (FRONTEND ONLY)
   ============================================================ */

export const clearAuth = () => {
  localStorage.clear();
};
