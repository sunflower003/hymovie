const express = require('express');
const router = express.Router();
const { searchMulti } = require('../controllers/searchController');

// GET /api/search
router.get('/', searchMulti);

module.exports = router;
