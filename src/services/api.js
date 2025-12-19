import axios from "axios";

// Use environment variable if set, otherwise default to Render URL
const API_BASE =
  import.meta.env.VITE_API_BASE || "https://etutor-website.onrender.com";

const api = axios.create({
  baseURL: API_BASE,
});

// Add token from localStorage to every request if it exists
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
