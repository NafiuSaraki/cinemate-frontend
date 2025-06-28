import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "cf98f7b3610d645358dc9cf430d1fdc7";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data.results);
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black py-6 px-4">
      <form onSubmit={searchMovies} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-l bg-gray-800 text-white outline-none"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-black px-4 py-2 rounded-r hover:bg-yellow-300"
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="text-center text-white my-4">
          <div className="animate-spin inline-block w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full"></div>
          <p className="mt-2">Searching...</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`} // Tura zuwa shafin MovieDetails
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="text-white text-center p-2 font-semibold">
                {movie.title}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;