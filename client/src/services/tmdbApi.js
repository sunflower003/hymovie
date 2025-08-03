import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getImageUrl = (path) => {
  if (!path) return null;
  return path; // Backend will return full URLs
};

export const getBackdropUrl = (path) => {
  if (!path) return null;
  return path; // Backend will return full URLs
};

// Get trending movies/TV shows
export const getTrending = async (mediaType = 'all', timeWindow = 'day') => {
  try {
    const response = await api.get('/trending', {
      params: { mediaType, timeWindow }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching trending:', error);
    return [];
  }
};

// Get popular movies
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await api.get('/movies/popular', {
      params: { page }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Get latest movies
export const getLatestMovies = async (page = 1) => {
  try {
    const response = await api.get('/movies/latest', {
      params: { page }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching latest movies:', error);
    return [];
  }
};

// Get popular TV shows
export const getPopularTVShows = async (page = 1) => {
  try {
    const response = await api.get('/tv/popular', {
      params: { page }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    return [];
  }
};

// Get latest TV shows
export const getLatestTVShows = async (page = 1) => {
  try {
    const response = await api.get('/tv/latest', {
      params: { page }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching latest TV shows:', error);
    return [];
  }
};

// Get movie details
export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movies/${movieId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// Get TV show details
export const getTVShowDetails = async (tvId) => {
  try {
    const response = await api.get(`/tv/${tvId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    return null;
  }
};

// Search movies and TV shows
export const searchMulti = async (query, page = 1) => {
  try {
    const response = await api.get('/search', {
      params: { query, page }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error searching:', error);
    return [];
  }
};

export default api;
