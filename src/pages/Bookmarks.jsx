import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarked")) || [];
    setBookmarks(stored);
  }, []);

  return (
    <div className="min-h-screen p-4 text-white bg-black">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">📌 Bookmarked Movies</h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bookmarks.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                className="rounded hover:scale-105 transition"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;