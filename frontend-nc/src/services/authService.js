// services/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ Lee desde .env o entorno de Vercel
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
