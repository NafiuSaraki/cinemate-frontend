// src/pages/Dashboard.jsx
import React from "react";
import Trending from "./Trending";
import HeroSection from "../components/HeroSection";

const Dashboard = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">My Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            alert("You have been logged out");
            window.location.href = "/login";
          }}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Hero Banner */}
      <HeroSection />

      {/* Trending & Search */}
      <Trending />
    </div>
  );
};

export default Dashboard;