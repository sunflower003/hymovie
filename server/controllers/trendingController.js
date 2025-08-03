const tmdbService = require('../services/tmdbService');

// Get trending content
const getTrending = async (req, res) => {
  try {
    const { mediaType = 'all', timeWindow = 'day' } = req.query;
    const trending = await tmdbService.getTrending(mediaType, timeWindow);
    
    // Add image URLs to each item
    const trendingWithImages = trending.map(item => ({
      ...item,
      poster_url: tmdbService.getImageUrl(item.poster_path),
      backdrop_url: tmdbService.getBackdropUrl(item.backdrop_path),
      vidsrc_url: tmdbService.getVidsrcUrl(item.id, item.media_type || 'movie')
    }));

    res.json({
      success: true,
      data: trendingWithImages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trending content',
      error: error.message
    });
  }
};

module.exports = {
  getTrending
};
