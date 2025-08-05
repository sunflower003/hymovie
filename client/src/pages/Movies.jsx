import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tmdbApi, getImageUrl } from '../services/tmdbApi';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from '../styles/components/HomeMovieList.module.css';
import tvShowsStyles from '../styles/pages/TVShows.module.css';

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeTab, setActiveTab] = useState('popular');
  const [currentPage, setCurrentPage] = useState({
    popular: 1,
    latest: 1,
    'top-rated': 1,
    'now-playing': 1
  });
  const [totalPages, setTotalPages] = useState({
    popular: 0,
    latest: 0,
    'top-rated': 0,
    'now-playing': 0
  });
  const navigate = useNavigate();

  // Helper function to load multiple pages to get 24 items
  const loadMultiplePages = async (fetchFunction, targetCount = 24, startPage = 1) => {
    let allMovies = [];
    let page = startPage;
    let totalPagesAvailable = 0;

    try {
      while (allMovies.length < targetCount) {
        const response = await fetchFunction(page);
        const movies = response.data || [];
        
        if (page === startPage) {
          totalPagesAvailable = response.total_pages || 0;
        }

        // Filter movies with poster and valid data
        const validMovies = movies.filter(movie => 
          movie.poster_path && movie.title && movie.vote_average
        );
        
        allMovies = [...allMovies, ...validMovies];
        
        // Break if no more pages or if we can't get more movies
        if (page >= totalPagesAvailable || movies.length === 0) {
          break;
        }
        
        page++;
      }

      return {
        data: allMovies.slice(0, targetCount),
        currentPage: page - 1, // Last page we fetched
        totalPages: totalPagesAvailable
      };
    } catch (error) {
      console.error('Error loading multiple pages:', error);
      return { data: [], currentPage: startPage, totalPages: 0 };
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        
        // Load 24 items for each category
        const [popular, latest] = await Promise.all([
          loadMultiplePages(tmdbApi.getPopularMovies, 24),
          loadMultiplePages(tmdbApi.getLatestMovies, 24)
        ]);

        setPopularMovies(popular.data);
        setLatestMovies(latest.data);

        setCurrentPage({
          popular: popular.currentPage,
          latest: latest.currentPage,
          'top-rated': 1,
          'now-playing': 1
        });
        
        setTotalPages({
          popular: popular.totalPages,
          latest: latest.totalPages,
          'top-rated': 0,
          'now-playing': 0
        });
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`, {
      state: {
        movieData: movie,
        mediaType: 'movie',
        title: movie.title
      }
    });
  };

  const getCurrentMovies = () => {
    switch (activeTab) {
      case 'popular':
        return popularMovies;
      case 'latest':
        return latestMovies;
      case 'top-rated':
        return topRatedMovies;
      case 'now-playing':
        return nowPlayingMovies;
      default:
        return popularMovies;
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'popular':
        return 'Popular Movies';
      case 'latest':
        return 'Latest Movies';
      case 'top-rated':
        return 'Top Rated Movies';
      case 'now-playing':
        return 'Now Playing Movies';
      default:
        return 'Popular Movies';
    }
  };

  const loadMore = async () => {
    if (loadingMore || currentPage[activeTab] >= totalPages[activeTab]) return;

    try {
      setLoadingMore(true);
      const nextPageStart = currentPage[activeTab] + 1;
      
      let fetchFunction;
      switch (activeTab) {
        case 'popular':
          fetchFunction = tmdbApi.getPopularMovies;
          break;
        case 'latest':
          fetchFunction = tmdbApi.getLatestMovies;
          break;
        default:
          return;
      }

      // Load next 24 items
      const result = await loadMultiplePages(fetchFunction, 24, nextPageStart);
      
      if (result.data.length > 0) {
        switch (activeTab) {
          case 'popular':
            setPopularMovies(prev => [...prev, ...result.data]);
            break;
          case 'latest':
            setLatestMovies(prev => [...prev, ...result.data]);
            break;
        }

        setCurrentPage(prev => ({
          ...prev,
          [activeTab]: result.currentPage
        }));
      }
    } catch (error) {
      console.error('Error loading more movies:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '200px 25px 40px', maxWidth: '1400px', margin: '0 auto', minHeight: '100vh' }}>
      <div className={tvShowsStyles.header}>
        <h1>Movies</h1>
        <div className={tvShowsStyles.tabs}>
          <button 
            className={`${tvShowsStyles.tab} ${activeTab === 'popular' ? tvShowsStyles.active : ''}`}
            onClick={() => setActiveTab('popular')}
          >
            Popular
          </button>
          <button 
            className={`${tvShowsStyles.tab} ${activeTab === 'latest' ? tvShowsStyles.active : ''}`}
            onClick={() => setActiveTab('latest')}
          >
            Latest
          </button>
        </div>
      </div>

      <div className={tvShowsStyles.content}>
        <h2>{getTabTitle()}</h2>
        {getCurrentMovies().length === 0 ? (
          <div className={tvShowsStyles.noContent}>
            <p>No movies available with complete information.</p>
          </div>
        ) : (
          <>
            <div className={styles.latestGrid}>
              {getCurrentMovies().map((movie) => (
                <div 
                  key={movie.id} 
                  className={styles.movieCard}
                  onClick={() => handleMovieClick(movie)}
                >
                  <div className={styles.posterContainer}>
                    <img
                      src={movie.poster_url || getImageUrl(movie.poster_path) || 'https://via.placeholder.com/300x450?text=No+Image'}
                      alt={movie.title}
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
                  </div>
                  <div className={styles.movieInfo}>
                    <h2 className={styles.movieTitle}>{movie.title}</h2>
                    <div className={styles.movieDetails}>
                      <span className={styles.year}>
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                      </span>
                      <span className={styles.rating}>
                        <i className="ri-star-fill"></i>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {currentPage[activeTab] < totalPages[activeTab] && (
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
                    cursor: loadingMore ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    minWidth: '150px',
                    height: '50px',
                    opacity: loadingMore ? 0.7 : 1
                  }}
                  onClick={loadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <LoadingSpinner size="small" />
                  ) : (
                    'Load More'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Movies;
