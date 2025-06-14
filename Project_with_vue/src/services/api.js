import axios from "axios";

const API_URL = "https://cw-project-dl2r.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Importante para cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
