import axios from "axios";
import Config from "../Constants/Config";

const API_URL = `${Config.API_BASE_URL}/api/admin/audit`;

// Get audit logs (paginated)
export const getAuditLogs = async (token, page = 1, q = "") => {
  const res = await axios.get(`${API_URL}/logs`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { page, q },
  });
  return res.data;
};

// Get single log by ID
export const getAuditLogById = async (id, token) => {
  const res = await axios.get(`${API_URL}/logs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get stats
export const getAuditStats = async (token) => {
  const res = await axios.get(`${API_URL}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Export CSV
export const exportAuditCsv = async (token) => {
  const res = await axios.get(`${API_URL}/export.csv`, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "audit_logs.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
