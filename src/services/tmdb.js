const API_KEY = "cf98f7b3610d645358dc9cf430d1fdc7";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};