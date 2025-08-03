const express = require('express');
const router = express.Router();
const { 
  getPopularTVShows, 
  getLatestTVShows, 
  getAiringTodayTVShows,
  getTopRatedTVShows,
  getTVShowDetails 
} = require('../controllers/tvController');

// GET /api/tv/popular
router.get('/popular', getPopularTVShows);

// GET /api/tv/latest
router.get('/latest', getLatestTVShows);

// GET /api/tv/airing-today
router.get('/airing-today', getAiringTodayTVShows);

// GET /api/tv/top-rated
router.get('/top-rated', getTopRatedTVShows);

// GET /api/tv/:id
router.get('/:id', getTVShowDetails);

module.exports = router;
