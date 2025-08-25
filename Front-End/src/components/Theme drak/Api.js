// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// You can add theme information to API requests if your backend needs it
export const configureApi = (theme) => {
  api.defaults.headers.common["X-Preferred-Theme"] = theme;
};

// Example of a theme-aware API call
export const fetchThemeSpecificData = async () => {
  try {
    // The backend could use the X-Preferred-Theme header to return theme-specific data
    const response = await api.get("/theme-data");
    return response.data;
  } catch (error) {
    console.error("Error fetching theme data:", error);
    throw error;
  }
};

export default api;
