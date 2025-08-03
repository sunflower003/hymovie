const express = require('express');
const router = express.Router();
const { getPopularMovies, getLatestMovies, getMovieDetails } = require('../controllers/movieController');

// GET /api/movies/popular
router.get('/popular', getPopularMovies);

// GET /api/movies/latest
router.get('/latest', getLatestMovies);

// GET /api/movies/:id
router.get('/:id', getMovieDetails);

module.exports = router;
