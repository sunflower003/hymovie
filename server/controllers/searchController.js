const tmdbService = require('../services/tmdbService');

// Search movies and TV shows
const searchMulti = async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const searchResponse = await tmdbService.searchMulti(query, page);
    
    // Add image URLs to each result
    const resultsWithImages = searchResponse.results.map(item => ({
      ...item,
      poster_url: tmdbService.getImageUrl(item.poster_path),
      backdrop_url: tmdbService.getBackdropUrl(item.backdrop_path),
      vidsrc_url: tmdbService.getVidsrcUrl(item.id, item.media_type || 'movie')
    }));

    res.json({
      success: true,
      data: resultsWithImages,
      total_pages: searchResponse.total_pages,
      page: searchResponse.page,
      total_results: searchResponse.total_results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching content',
      error: error.message
    });
  }
};

module.exports = {
  searchMulti
};
