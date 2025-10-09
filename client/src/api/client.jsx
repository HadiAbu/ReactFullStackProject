import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // Express backend
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
