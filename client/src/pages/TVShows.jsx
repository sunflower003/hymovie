import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/HomeMovieList.module.css';
import tvShowsStyles from '../styles/pages/TVShows.module.css';
import { tmdbApi } from '../services/tmdbApi';
import LoadingSpinner from '../components/LoadingSpinner';

const TVShows = () => {
  const [latestShows, setLatestShows] = useState([]);
  const [airingTodayShows, setAiringTodayShows] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [activeTab, setActiveTab] = useState('latest');
  const [currentPage, setCurrentPage] = useState({
    latest: 1,
    'airing-today': 1,
    'top-rated': 1,
    popular: 1
  });
  const [totalPages, setTotalPages] = useState({
    latest: 0,
    'airing-today': 0,
    'top-rated': 0,
    popular: 0
  });
  const navigate = useNavigate();

  // Helper function to load multiple pages to get 24 items
  const loadMultiplePages = async (fetchFunction, targetCount = 24, startPage = 1) => {
    let allShows = [];
    let page = startPage;
    let totalPagesAvailable = 0;

    try {
      while (allShows.length < targetCount) {
        const response = await fetchFunction(page);
        const shows = response.data || [];
        
        if (page === startPage) {
          totalPagesAvailable = response.total_pages || 0;
        }

        // Filter shows with poster and valid data
        const validShows = shows.filter(show => 
          show.poster_path && show.name && show.vote_average
        );
        
        allShows = [...allShows, ...validShows];
        
        // Break if no more pages or if we can't get more shows
        if (page >= totalPagesAvailable || shows.length === 0) {
          break;
        }
        
        page++;
      }

      return {
        data: allShows.slice(0, targetCount),
        currentPage: page - 1, // Last page we fetched
        totalPages: totalPagesAvailable
      };
    } catch (error) {
      console.error('Error loading multiple pages:', error);
      return { data: [], currentPage: startPage, totalPages: 0 };
    }
  };

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true);
        
        // Load 24 items for each category
        const [latest, airingToday, topRated, popular] = await Promise.all([
          loadMultiplePages(tmdbApi.getLatestTVShows, 24),
          loadMultiplePages(tmdbApi.getAiringTodayTVShows, 24),
          loadMultiplePages(tmdbApi.getTopRatedTVShows, 24),
          loadMultiplePages(tmdbApi.getPopularTVShows, 24)
        ]);

        setLatestShows(latest.data);
        setAiringTodayShows(airingToday.data);
        setTopRatedShows(topRated.data);
        setPopularShows(popular.data);

        setCurrentPage({
          latest: latest.currentPage,
          'airing-today': airingToday.currentPage,
          'top-rated': topRated.currentPage,
          popular: popular.currentPage
        });

        setTotalPages({
          latest: latest.totalPages,
          'airing-today': airingToday.totalPages,
          'top-rated': topRated.totalPages,
          popular: popular.totalPages
        });

      } catch (error) {
        console.error('Error fetching TV shows:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, []);

  const handleShowClick = (show) => {
    navigate(`/movie/${show.id}`, {
      state: {
        movieData: show,
        mediaType: 'tv',
        title: show.name
      }
    });
  };

  const getCurrentShows = () => {
    switch (activeTab) {
      case 'latest':
        return latestShows;
      case 'airing-today':
        return airingTodayShows;
      case 'top-rated':
        return topRatedShows;
      case 'popular':
        return popularShows;
      default:
        return latestShows;
    }
  };

  const loadMore = async () => {
    if (loadingMore) return;

    try {
      setLoadingMore(true);
      const nextPageStart = currentPage[activeTab] + 1;
      
      let fetchFunction;
      switch (activeTab) {
        case 'latest':
          fetchFunction = tmdbApi.getLatestTVShows;
          break;
        case 'airing-today':
          fetchFunction = tmdbApi.getAiringTodayTVShows;
          break;
        case 'top-rated':
          fetchFunction = tmdbApi.getTopRatedTVShows;
          break;
        case 'popular':
          fetchFunction = tmdbApi.getPopularTVShows;
          break;
        default:
          return;
      }

      // Load next 24 items
      const result = await loadMultiplePages(fetchFunction, 24, nextPageStart);
      
      if (result.data.length > 0) {
        switch (activeTab) {
          case 'latest':
            setLatestShows(prev => [...prev, ...result.data]);
            break;
          case 'airing-today':
            setAiringTodayShows(prev => [...prev, ...result.data]);
            break;
          case 'top-rated':
            setTopRatedShows(prev => [...prev, ...result.data]);
            break;
          case 'popular':
            setPopularShows(prev => [...prev, ...result.data]);
            break;
        }

        setCurrentPage(prev => ({
          ...prev,
          [activeTab]: prev[activeTab] + Math.ceil(result.data.length / 20)
        }));
      }
    } catch (error) {
      console.error('Error loading more shows:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'latest':
        return 'Latest TV Shows';
      case 'airing-today':
        return 'Airing Today';
      case 'top-rated':
        return 'Top Rated';
      case 'popular':
        return 'Popular';
      default:
        return 'Latest TV Shows';
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
        <h1>TV Shows</h1>
        <div className={tvShowsStyles.tabs}>
          <button 
            className={`${tvShowsStyles.tab} ${activeTab === 'latest' ? tvShowsStyles.active : ''}`}
            onClick={() => setActiveTab('latest')}
          >
            Latest
          </button>
          <button 
            className={`${tvShowsStyles.tab} ${activeTab === 'airing-today' ? tvShowsStyles.active : ''}`}
            onClick={() => setActiveTab('airing-today')}
          >
            Airing Today
          </button>
          <button 
            className={`${tvShowsStyles.tab} ${activeTab === 'top-rated' ? tvShowsStyles.active : ''}`}
            onClick={() => setActiveTab('top-rated')}
          >
            Top Rated
          </button>
          <button 
            className={`${tvShowsStyles.tab} ${activeTab === 'popular' ? tvShowsStyles.active : ''}`}
            onClick={() => setActiveTab('popular')}
          >
            Popular
          </button>
        </div>
      </div>

      <div className={tvShowsStyles.content}>
        <h2>{getTabTitle()}</h2>
        {getCurrentShows().length === 0 ? (
          <div className={tvShowsStyles.noContent}>
            <p>No TV shows available with complete information.</p>
          </div>
        ) : (
          <>
            <div className={styles.latestGrid}>
              {getCurrentShows().map((show) => (
                <div 
                  key={show.id} 
                  className={styles.movieCard}
                  onClick={() => handleShowClick(show)}
                >
                  <div className={styles.posterContainer}>
                    <img
                      src={show.poster_url || 'https://via.placeholder.com/300x450?text=No+Image'}
                      alt={show.name}
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
                    <h2 className={styles.movieTitle}>{show.name}</h2>
                    <div className={styles.movieDetails}>
                      <span className={styles.year}>
                        {show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'N/A'}
                      </span>
                      <span className={styles.rating}>
                        <i className="ri-star-fill"></i>{show.vote_average ? show.vote_average.toFixed(1) : 'N/A'}
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
                    <>
                      <LoadingSpinner size="small" />
                      Loading...
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
    </div>
  );
};

export default TVShows;
