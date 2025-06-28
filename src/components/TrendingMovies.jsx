// src/components/TrendingMovies.jsx

import React from "react";
import { Link } from "react-router-dom";
import trendingMovies from "../pages/Trending";

const TrendingMovies = () => {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-10">
      <h2 className="text-3xl font-bold text-white mb-6 px-4">🔥 Trending Now</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4">
        {trendingMovies.length > 0 ? (
          trendingMovies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="bg-gray-800 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden">
                <img
                  src={
                    movie.posterUrl
                      ? movie.posterUrl
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={movie.title || "Untitled Movie"}
                  className="w-full h-72 object-cover"
                />
                <div className="text-white text-center p-2 font-semibold">
                  {movie.title || "Untitled"}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-white col-span-full text-center">
            😞 No trending movies found.
          </p>
        )}
      </div>
    </section>
  );
};

export default TrendingMovies;