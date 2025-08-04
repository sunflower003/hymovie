import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchMulti, getImageUrl } from '../services/tmdbApi';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from '../styles/components/HomeMovieList.module.css'; // Sử dụng CSS từ HomeMovieList

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Add spinner animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    if (query) {
      performSearch(query, 1);
    }
  }, [query]);

  const performSearch = async (searchQuery, page = 1) => {
    try {
      setLoading(true);
      console.log('Performing search for:', searchQuery); // Debug log
      const response = await searchMulti(searchQuery, page);
      console.log('Search response received:', response); // Debug log
      
      const allResults = response.data || [];
      
      // Lọc ra những kết quả có poster_path hoặc poster_url và không phải là person
      const filteredResults = allResults.filter(item => 
        (item.poster_path || item.poster_url) && 
        item.media_type !== 'person' &&
        (item.title || item.name) // Phải có tên
      );
      
      if (page === 1) {
        setResults(filteredResults);
      } else {
        setResults(prev => [...prev, ...filteredResults]);
      }
      
      setCurrentPage(page);
      setTotalPages(response.total_pages || 0);
    } catch (error) {
      console.error('Error searching:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie) => {
    const mediaType = movie.media_type || (movie.first_air_date ? 'tv' : 'movie');
    const id = movie.id;
    const title = movie.title || movie.name;
    
    navigate(`/movie/${id}`, { 
      state: { 
        movieData: movie, 
        mediaType: mediaType,
        title: title
      } 
    });
  };

  const loadMore = () => {
    if (currentPage < totalPages && !loading) {
      performSearch(query, currentPage + 1);
    }
  };

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const formatYear = (date) => {
    if (!date) return 'N/A';
    return new Date(date).getFullYear();
  };

  const getMediaTypeDisplay = (item) => {
    if (item.media_type === 'movie') return 'Movie';
    if (item.media_type === 'tv') return 'TV Show';
    if (item.first_air_date) return 'TV Show';
    return 'Movie';
  };

  if (!query) {
    return (
      <div className={styles.container}>
        <div className={styles.noQuery}>
          <h1>No search query provided</h1>
          <p>Please enter a search term to find movies and TV shows.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '120px 20px 40px', maxWidth: '1400px', margin: '0 auto', minHeight: '100vh' }}>
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '600', color: '#fff', marginBottom: '10px' }}>
          Search Results for "{query}"
        </h1>
        {results.length > 0 && (
          <p style={{ fontSize: '1rem', color: '#b3b3b3', margin: '0' }}>
            Found {results.length} results
          </p>
        )}
      </div>

      {loading && results.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', color: '#fff' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid #333', borderTop: '4px solid #e50914', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <p style={{ marginTop: '20px', fontSize: '1.2rem', color: '#b3b3b3' }}>Searching...</p>
        </div>
      ) : results.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: '#fff' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#fff' }}>No results found</h2>
          <p style={{ fontSize: '1.2rem', color: '#b3b3b3', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Try searching with different keywords or check your spelling.
          </p>
        </div>
      ) : (
        <>
          <div className={styles.latestGrid}>
            {results.map((item) => (
              <div key={`${item.media_type}-${item.id}`} className={styles.movieCard} onClick={() => handleMovieClick(item)}>
                <div className={styles.posterContainer}>
                  <img 
                    src={item.poster_url || getImageUrl(item.poster_path)} 
                    alt={item.title || item.name} 
                    className={styles.moviePoster} 
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                    }}
                  />
                  <div className={styles.playOverlay}>
                    <div className={styles.playButton}>
                      <i className="ri-play-fill"></i>
                    </div>
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(229, 9, 20, 0.9)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {getMediaTypeDisplay(item)}
                  </div>
                </div>
                <div className={styles.movieInfo}>
                  <h2 className={styles.movieTitle}>{item.title || item.name}</h2>
                  <div className={styles.movieDetails}>
                    <span className={styles.year}>
                      {formatYear(item.release_date || item.first_air_date)}
                    </span>
                    <span className={styles.rating}>
                      <i className="ri-star-fill"></i>{formatRating(item.vote_average)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {currentPage < totalPages && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
              <button 
                style={{
                  background: 'linear-gradient(135deg, #e50914, #b20710)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 40px',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onClick={loadMore}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="small" />
                  </>
                ) : (
                  'Load More'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
