// src/pages/MovieDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "cf98f7b3610d645358dc9cf430d1fdc7";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);

  // Fetch movie details
  const fetchMovieDetails = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
    );
    const data = await res.json();
    setMovie(data);
  };

  // Fetch similar movies
  const fetchSimilarMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`
    );
    const data = await res.json();
    setSimilarMovies(data.results);
  };

  // Load reviews from localStorage
  const loadReviews = () => {
    const allReviews = JSON.parse(localStorage.getItem("reviews")) || {};
    setReviews(allReviews[movieId] || []);
  };

  // Load rating from localStorage
  const loadRating = () => {
    const allRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    setRating(allRatings[movieId] || 0);
  };

  // Submit review
  const handleSubmitReview = () => {
    if (!review.trim()) return;

    const allReviews = JSON.parse(localStorage.getItem("reviews")) || {};
    const movieReviews = allReviews[movieId] || [];
    movieReviews.push(review.trim());
    allReviews[movieId] = movieReviews;

    localStorage.setItem("reviews", JSON.stringify(allReviews));
    setReview("");
    setReviews(movieReviews);
  };

  // Set rating
  const handleRating = (val) => {
    setRating(val);
    const allRatings = JSON.parse(localStorage.getItem("ratings")) || {};
    allRatings[movieId] = val;
    localStorage.setItem("ratings", JSON.stringify(allRatings));
  };

  // Bookmark movie
  const handleBookmark = () => {
    const stored = JSON.parse(localStorage.getItem("bookmarked")) || [];
    const exists = stored.find((m) => m.id === movie.id);
    if (!exists) {
      const updated = [...stored, movie];
      localStorage.setItem("bookmarked", JSON.stringify(updated));
      alert("Bookmarked!");
    } else {
      alert("Already bookmarked");
    }
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchSimilarMovies();
    loadReviews();
    loadRating();
  }, [movieId]);

  if (!movie) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="bg-black text-white min-h-screen p-4">
      {/* Movie Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-xl shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">
            {movie.title}
          </h1>
          <p className="text-gray-300 mb-4">{movie.overview}</p>
          <p className="text-sm text-gray-400 mb-1">🎭 Genres: {movie.genres?.map(g => g.name).join(", ")}</p>
          <p className="text-sm text-gray-400 mb-1">🕒 Runtime: {movie.runtime} mins</p>
          <p className="text-sm text-gray-400 mb-4">📆 Release Date: {movie.release_date}</p>

          <button
            onClick={handleBookmark}
            className="bg-yellow-500 text-black px-4 py-2 rounded mb-4"
          >
            📌 Bookmark
          </button>

          {/* Rating Section */}
          <div className="mb-6">
            <p className="mb-1">⭐ Your Rating:</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => handleRating(val)}
                  className={`text-2xl ${val <= rating ? "text-yellow-400" : "text-gray-500"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Review Section */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">✍️ Your Reviews</h3>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full p-2 rounded text-black"
            />
            <button
              onClick={handleSubmitReview}
              className="mt-2 bg-blue-500 text-white px-4 py-1 rounded"
            >
              Submit Review
            </button>
            <div className="mt-4 space-y-2">
              {reviews.map((r, i) => (
                <p
                  key={i}
                  className="text-sm bg-gray-800 p-2 rounded"
                >
                  • {r}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Similar Movies Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-yellow-400 mb-4">
          🎬 Similar Movies
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {similarMovies.map((movie) => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded hover:scale-105 transition"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;