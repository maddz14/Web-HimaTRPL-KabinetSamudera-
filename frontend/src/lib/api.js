import axios from "axios";

// Jika ada env var, gunakan itu (untuk production/staging).
// Jika tidak, gunakan path relatif agar request lewat proxy dev server (port 3000).
// Ini membuat HP bisa akses API tanpa perlu buka port 8000 secara langsung.
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    // Cara paling aman untuk semua versi Axios
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});


export function formatApiErrorDetail(detail) {
  if (detail == null) return "Terjadi kesalahan. Silakan coba lagi.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail
      .map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e)))
      .filter(Boolean)
      .join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

export default api;
