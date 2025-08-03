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
      const response = await this.api.get('/movie/now_playing', {
        params: { page }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching latest movies:', error);
      throw error;
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
      const response = await this.api.get('/tv/on_the_air', {
        params: { page }
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching latest TV shows:', error);
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
      return response.data.results;
    } catch (error) {
      console.error('Error searching:', error);
      throw error;
    }
  }
}

module.exports = new TMDBService();
