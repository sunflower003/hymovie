const axios = require('axios');

class TMDBService {
  constructor() {
    this.baseURL = process.env.TMDB_BASE_URL;
    this.accessToken = process.env.TMDB_ACCESS_TOKEN;
    this.imageBaseURL = process.env.TMDB_IMAGE_BASE_URL;
    this.backdropBaseURL = process.env.TMDB_BACKDROP_BASE_URL;
    this.vidsrcBaseURL = process.env.VIDSRC_BASE_URL;
    
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      },
      params: {
        language: 'en-US',
      },
    });
  }

  getImageUrl(path) {
    if (!path) return null;
    return `${this.imageBaseURL}${path}`;
  }

  getBackdropUrl(path) {
    if (!path) return null;
    return `${this.backdropBaseURL}${path}`;
  }

  getVidsrcUrl(id, mediaType = 'movie') {
    return `${this.vidsrcBaseURL}/${mediaType}/${id}`;
  }

  async getTrending(mediaType = 'all', timeWindow = 'day') {
    try {
      const response = await this.api.get(`/trending/${mediaType}/${timeWindow}`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching trending:', error);
      throw error;
    }
  }

  async getPopularMovies(page = 1) {
    try {
      const response = await this.api.get('/movie/popular', {
        params: { page }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  }

  async getLatestMovies(page = 1) {
    try {
      // Get movies from the beginning of this year (2025)
      const currentYear = new Date().getFullYear();
      const startOfYear = `${currentYear}-01-01`;
      const today = new Date().toISOString().split('T')[0];
      
      const response = await this.api.get('/discover/movie', {
        params: { 
          page,
          sort_by: 'release_date.desc',
          'release_date.gte': startOfYear, // Movies from beginning of current year
          'release_date.lte': today, // Up to today
          include_adult: false,
          'vote_count.gte': 10 // At least 10 votes for better quality
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching latest movies:', error);
      // Fallback to now_playing if discover fails
      try {
        const fallbackResponse = await this.api.get('/movie/now_playing', {
          params: { page }
        });
        return fallbackResponse.data.results;
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        throw error;
      }
    }
  }

  async getPopularTVShows(page = 1) {
    try {
      const response = await this.api.get('/tv/popular', {
        params: { page }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching popular TV shows:', error);
      throw error;
    }
  }

  async getLatestTVShows(page = 1) {
    try {
      // Get TV shows from the beginning of this year (2025)
      const currentYear = new Date().getFullYear();
      const startOfYear = `${currentYear}-01-01`;
      const today = new Date().toISOString().split('T')[0];
      
      const response = await this.api.get('/discover/tv', {
        params: { 
          page,
          sort_by: 'first_air_date.desc',
          'first_air_date.gte': startOfYear, // Shows from beginning of current year
          'first_air_date.lte': today, // Up to today
          with_status: '0|1|2|3', // All statuses
          include_adult: false,
          'vote_count.gte': 10 // At least 10 votes for better quality
        }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching latest TV shows:', error);
      // Fallback to on_the_air if discover fails
      try {
        const fallbackResponse = await this.api.get('/tv/on_the_air', {
          params: { page }
        });
        return fallbackResponse.data.results;
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        throw error;
      }
    }
  }

  async getAiringTodayTVShows(page = 1) {
    try {
      const response = await this.api.get('/tv/airing_today', {
        params: { page }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching airing today TV shows:', error);
      throw error;
    }
  }

  async getTopRatedTVShows(page = 1) {
    try {
      const response = await this.api.get('/tv/top_rated', {
        params: { page }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching top rated TV shows:', error);
      throw error;
    }
  }

  async getMovieDetails(movieId) {
    try {
      const response = await this.api.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'credits,videos'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }

  async getTVShowDetails(tvId) {
    try {
      const response = await this.api.get(`/tv/${tvId}`, {
        params: {
          append_to_response: 'credits,videos'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching TV show details:', error);
      throw error;
    }
  }

  async searchMulti(query, page = 1) {
    try {
      const response = await this.api.get('/search/multi', {
        params: { query, page }
      });
      return response.data; // Return the full response object with results and total_pages
    } catch (error) {
      console.error('Error searching:', error);
      throw error;
    }
  }
}

module.exports = new TMDBService();
