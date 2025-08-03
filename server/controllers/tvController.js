const tmdbService = require('../services/tmdbService');

// Get popular TV shows
const getPopularTVShows = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const tvShows = await tmdbService.getPopularTVShows(page);
    
    // Add image URLs to each TV show
    const tvShowsWithImages = tvShows.map(show => ({
      ...show,
      poster_url: tmdbService.getImageUrl(show.poster_path),
      backdrop_url: tmdbService.getBackdropUrl(show.backdrop_path),
      vidsrc_url: tmdbService.getVidsrcUrl(show.id, 'tv')
    }));

    res.json({
      success: true,
      data: tvShowsWithImages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching popular TV shows',
      error: error.message
    });
  }
};

// Get latest TV shows
const getLatestTVShows = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const tvShows = await tmdbService.getLatestTVShows(page);
    
    // Add image URLs to each TV show
    const tvShowsWithImages = tvShows.map(show => ({
      ...show,
      poster_url: tmdbService.getImageUrl(show.poster_path),
      backdrop_url: tmdbService.getBackdropUrl(show.backdrop_path),
      vidsrc_url: tmdbService.getVidsrcUrl(show.id, 'tv')
    }));

    res.json({
      success: true,
      data: tvShowsWithImages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching latest TV shows',
      error: error.message
    });
  }
};

// Get TV show details
const getTVShowDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const tvShow = await tmdbService.getTVShowDetails(id);
    
    if (!tvShow) {
      return res.status(404).json({
        success: false,
        message: 'TV show not found'
      });
    }

    // Add image URLs
    const tvShowWithImages = {
      ...tvShow,
      poster_url: tmdbService.getImageUrl(tvShow.poster_path),
      backdrop_url: tmdbService.getBackdropUrl(tvShow.backdrop_path),
      vidsrc_url: tmdbService.getVidsrcUrl(tvShow.id, 'tv')
    };

    res.json({
      success: true,
      data: tvShowWithImages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching TV show details',
      error: error.message
    });
  }
};

module.exports = {
  getPopularTVShows,
  getLatestTVShows,
  getTVShowDetails
};
