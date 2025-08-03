const tmdbService = require('../services/tmdbService');

// Get popular movies
const getPopularMovies = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const movies = await tmdbService.getPopularMovies(page);
    
    // Add image URLs to each movie
    const moviesWithImages = movies.map(movie => ({
      ...movie,
      poster_url: tmdbService.getImageUrl(movie.poster_path),
      backdrop_url: tmdbService.getBackdropUrl(movie.backdrop_path),
      vidsrc_url: tmdbService.getVidsrcUrl(movie.id, 'movie')
    }));

    res.json({
      success: true,
      data: moviesWithImages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching popular movies',
      error: error.message
    });
  }
};

// Get latest movies
const getLatestMovies = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const movies = await tmdbService.getLatestMovies(page);
    
    // Add image URLs to each movie
    const moviesWithImages = movies.map(movie => ({
      ...movie,
      poster_url: tmdbService.getImageUrl(movie.poster_path),
      backdrop_url: tmdbService.getBackdropUrl(movie.backdrop_path),
      vidsrc_url: tmdbService.getVidsrcUrl(movie.id, 'movie')
    }));

    res.json({
      success: true,
      data: moviesWithImages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching latest movies',
      error: error.message
    });
  }
};

// Get movie details
const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await tmdbService.getMovieDetails(id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    // Add image URLs
    const movieWithImages = {
      ...movie,
      poster_url: tmdbService.getImageUrl(movie.poster_path),
      backdrop_url: tmdbService.getBackdropUrl(movie.backdrop_path),
      vidsrc_url: tmdbService.getVidsrcUrl(movie.id, 'movie')
    };

    res.json({
      success: true,
      data: movieWithImages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching movie details',
      error: error.message
    });
  }
};

module.exports = {
  getPopularMovies,
  getLatestMovies,
  getMovieDetails
};
