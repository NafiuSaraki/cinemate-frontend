import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "cf98f7b3610d645358dc9cf430d1fdc7";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [error, setError] = useState(null);

  const fetchTrending = async (pageNum = 1) => {
    try {
      setError(null);
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${pageNum}`
      );
      const data = await res.json();
      if (res.ok) {
        setMovies(data.results || []);
      } else {
        throw new Error(data.status_message || "Failed to fetch trending movies.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchByGenre = async (genreId) => {
    try {
      setError(null);
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
      );
      const data = await res.json();
      if (res.ok) {
        setMovies(data.results || []);
      } else {
        throw new Error(data.status_message || "Failed to fetch movies by genre.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      const data = await res.json();
      if (res.ok) {
        setGenres(data.genres || []);
      } else {
        throw new Error(data.status_message || "Failed to load genres.");
      }
    } catch (err) {
      console.error("Genre Fetch Error:", err.message);
    }
  };

  const handleSearch = async () => {
    if (query.trim() === "") return;

    try {
      setError(null);
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      const data = await res.json();
      if (res.ok) {
        setSearchResults(data.results || []);
      } else {
        throw new Error(data.status_message || "Failed to search movies.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchGenres();
    if (selectedGenre) {
      fetchByGenre(selectedGenre);
    } else {
      fetchTrending(page);
    }
  }, [page, selectedGenre]);

  return (
    <div className="bg-black text-white py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-yellow-400">🔥 Trending Movies</h2>

      {/* Search Bar */}
      <div className="mb-6 flex flex-wrap gap-2 items-center">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded w-64 text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-500 text-black px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Genre Filter */}
      <div className="flex flex-wrap mb-6 gap-3">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => {
              setSelectedGenre(genre.id);
              setSearchResults([]);
            }}
            className={`px-3 py-1 rounded ${
              selectedGenre === genre.id
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 text-white"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 bg-gray-800 p-4 rounded mb-6">
          ⚠️ {error}
        </div>
      )}

      {/* Movie List */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {(searchResults.length > 0 ? searchResults : movies)
          .filter((movie) => movie.poster_path) // skip movies with no image
          .map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="text-white text-center p-2 font-semibold">
                  {movie.title}
                </div>
              </div>
            </Link>
          ))}
      </div>

      {/* Pagination */}
      {searchResults.length === 0 && !error && (
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-lg">Page {page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Trending;