import React from 'react';
import { useFav } from '../context/FavContext';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { saveMovie } = useFav();
  const navigate = useNavigate();

  const handleSave = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    saveMovie(movie);
  };

  return (
    <div className="bg-white text-black shadow rounded p-4 m-2">
      <h3 className="text-lg font-semibold">{movie.title}</h3>
      <p>{movie.overview?.slice(0, 100)}...</p>
      <button
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
        onClick={handleSave}
      >
        ❤️ Save
      </button>
    </div>
  );
};

export default MovieCard;