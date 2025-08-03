import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/pages/TVShows.module.css';
import { tmdbApi } from '../services/tmdbApi';

const TVShows = () => {
  const [latestShows, setLatestShows] = useState([]);
  const [airingTodayShows, setAiringTodayShows] = useState([]);
  const [topRatedShows, setTopRatedShows] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('latest');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true);
        const [latest, airingToday, topRated, popular] = await Promise.all([
          tmdbApi.getLatestTVShows(1),
          tmdbApi.getAiringTodayTVShows(1),
          tmdbApi.getTopRatedTVShows(1),
          tmdbApi.getPopularTVShows(1)
        ]);

        setLatestShows(latest || []);
        setAiringTodayShows(airingToday || []);
        setTopRatedShows(topRated || []);
        setPopularShows(popular || []);
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
      <div className={styles.tvshows}>
        <div className={styles.loading}>Loading TV Shows...</div>
      </div>
    );
  }

  return (
    <div className={styles.tvshows}>
      <div className={styles.header}>
        <h1>TV Shows</h1>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === 'latest' ? styles.active : ''}`}
            onClick={() => setActiveTab('latest')}
          >
            Latest
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'airing-today' ? styles.active : ''}`}
            onClick={() => setActiveTab('airing-today')}
          >
            Airing Today
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'top-rated' ? styles.active : ''}`}
            onClick={() => setActiveTab('top-rated')}
          >
            Top Rated
          </button>
          <button 
            className={`${styles.tab} ${activeTab === 'popular' ? styles.active : ''}`}
            onClick={() => setActiveTab('popular')}
          >
            Popular
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <h2>{getTabTitle()}</h2>
        {getCurrentShows().length === 0 ? (
          <div className={styles.noContent}>
            <p>No TV shows available with complete information.</p>
          </div>
        ) : (
          <div className={styles.showsGrid}>
            {getCurrentShows().map((show) => (
              <div 
                key={show.id} 
                className={styles.showCard}
                onClick={() => handleShowClick(show)}
              >
                <div className={styles.posterContainer}>
                  <img
                    src={show.poster_url || 'https://via.placeholder.com/300x450?text=No+Image'}
                    alt={show.name}
                    className={styles.poster}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                    }}
                  />
                  <div className={styles.overlay}>
                    <div className={styles.playButton}>▶</div>
                  </div>
                </div>
                <div className={styles.showInfo}>
                  <h3 className={styles.showTitle}>{show.name}</h3>
                  <div className={styles.showMeta}>
                    <span className={styles.year}>
                      {show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'N/A'}
                    </span>
                    <span className={styles.rating}>
                      ⭐ {show.vote_average ? show.vote_average.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TVShows;
