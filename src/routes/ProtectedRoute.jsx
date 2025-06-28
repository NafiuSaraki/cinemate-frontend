// src/routes/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Access denied. Please login to continue.");
    }
  }, [token]);

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;