/**
 * Utility functions for generating video embed URLs
 */

/**
 * Generate VidSrc embed URL for movies
 * @param {string|number} tmdbId - TMDB ID of the movie
 * @param {Object} options - Additional options
 * @param {string} options.ds_lang - Default subtitle language (ISO639 code)
 * @param {boolean} options.autoplay - Enable autoplay (default: true)
 * @param {string} options.sub_url - Custom subtitle URL (must be CORS enabled)
 * @returns {string} VidSrc embed URL
 */
export const generateMovieEmbedUrl = (tmdbId, options = {}) => {
  const {
    ds_lang = '',
    autoplay = true,
    sub_url = ''
  } = options;

  const baseUrl = `https://vidsrc.xyz/embed/movie`;
  const params = new URLSearchParams();
  
  params.append('tmdb', tmdbId);
  if (autoplay) params.append('autoplay', '1');
  if (ds_lang) params.append('ds_lang', ds_lang);
  if (sub_url) params.append('sub_url', encodeURIComponent(sub_url));

  return `${baseUrl}?${params.toString()}`;
};

/**
 * Generate VidSrc embed URL for TV shows
 * @param {string|number} tmdbId - TMDB ID of the TV show
 * @param {number} season - Season number
 * @param {number} episode - Episode number
 * @param {Object} options - Additional options
 * @param {string} options.ds_lang - Default subtitle language (ISO639 code)
 * @param {boolean} options.autoplay - Enable autoplay (default: true)
 * @param {boolean} options.autonext - Enable auto next episode (default: true)
 * @param {string} options.sub_url - Custom subtitle URL (must be CORS enabled)
 * @returns {string} VidSrc embed URL
 */
export const generateTVEmbedUrl = (tmdbId, season, episode, options = {}) => {
  const {
    ds_lang = '',
    autoplay = true,
    autonext = true,
    sub_url = ''
  } = options;

  const baseUrl = `https://vidsrc.xyz/embed/tv`;
  const params = new URLSearchParams();
  
  params.append('tmdb', tmdbId);
  params.append('season', season);
  params.append('episode', episode);
  if (autoplay) params.append('autoplay', '1');
  if (autonext) params.append('autonext', '1');
  if (ds_lang) params.append('ds_lang', ds_lang);
  if (sub_url) params.append('sub_url', encodeURIComponent(sub_url));

  return `${baseUrl}?${params.toString()}`;
};

/**
 * Generate fallback URLs for video streaming
 * @param {string|number} tmdbId - TMDB ID
 * @param {string} mediaType - 'movie' or 'tv'
 * @param {number} season - Season number (for TV shows)
 * @param {number} episode - Episode number (for TV shows)
 * @returns {string[]} Array of fallback URLs
 */
export const generateFallbackUrls = (tmdbId, mediaType, season = 1, episode = 1) => {
  if (mediaType === 'tv') {
    return [
      generateTVEmbedUrl(tmdbId, season, episode),
      `https://vidsrc.to/embed/tv/${tmdbId}/${season}/${episode}`,
      `https://vidsrc.xyz/embed/tv/${tmdbId}/${season}-${episode}`,
      `https://vidsrc.cc/v2/embed/tv/${tmdbId}/${season}/${episode}`,
      `https://embed.su/embed/tv/${tmdbId}/${season}/${episode}`
    ];
  } else {
    return [
      generateMovieEmbedUrl(tmdbId),
      `https://vidsrc.to/embed/movie/${tmdbId}`,
      `https://vidsrc.xyz/embed/movie/${tmdbId}`,
      `https://vidsrc.cc/v2/embed/movie/${tmdbId}`,
      `https://embed.su/embed/movie/${tmdbId}`
    ];
  }
};

/**
 * Get video embed URL with proper fallbacks
 * @param {Object} params - Parameters
 * @param {string|number} params.tmdbId - TMDB ID
 * @param {string} params.mediaType - 'movie' or 'tv'
 * @param {number} params.season - Season number (for TV shows)
 * @param {number} params.episode - Episode number (for TV shows)
 * @param {Object} params.options - Additional options
 * @returns {string} Primary embed URL
 */
export const getVideoEmbedUrl = ({ tmdbId, mediaType, season = 1, episode = 1, options = {} }) => {
  if (mediaType === 'tv') {
    return generateTVEmbedUrl(tmdbId, season, episode, options);
  } else {
    return generateMovieEmbedUrl(tmdbId, options);
  }
};
