// src/api/api.js
import axios from "axios";

// Cliente Axios base
const api = axios.create({
  baseURL: "https://grand-central-backend-develop.onrender.com/api/", // tu backend Spring Boot
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor: agrega token JWT si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;