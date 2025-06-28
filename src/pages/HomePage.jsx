import React from "react";
import Trending from "./Trending";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <div className="bg-black text-white">
      {/* Hero Banner */}
      <HeroSection />

      {/* Trending & Search */}
      <Trending />
    </div>
  );
};

export default Home;