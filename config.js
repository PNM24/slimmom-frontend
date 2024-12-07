const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://slimmom-backend-v2.onrender.com" // URL backend producție
    : "http://localhost:3000/api"; // URL backend local

export default API_URL;