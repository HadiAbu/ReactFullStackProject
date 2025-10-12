import axios from "axios";
const API_URL = import.meta.env.VITE_BACKEND_URL_API;

export const api = axios.create({
  baseURL: API_URL, // Express backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Example of interceptor: add auth token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
