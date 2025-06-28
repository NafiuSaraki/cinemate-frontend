import API from "./axios";

export const register = async (userData) => {
  const res = await API.post("/auth/register", userData);
  return res.data;
};

export const login = async (userData) => {
  const res = await API.post("/auth/login", userData);
  return res.data;
};