import axios from "axios";

const API = axios.create({
  baseURL: "https://cinmate-backend.onrender.com/api",
});

// Add token to headers if it exists
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export default API;
