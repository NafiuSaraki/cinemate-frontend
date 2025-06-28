import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.div
      className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg)", // canza hoton idan kana so
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="bg-black bg-opacity-50 p-6 rounded-xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4">
          Welcome to MovieHub
        </h1>
        <p className="text-lg md:text-xl">
          Discover trending movies, search by genre, and more...
        </p>
      </div>
    </motion.div>
  );
};

export default HeroSection;