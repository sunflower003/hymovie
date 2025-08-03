import React, { useState, useEffect } from 'react';
import { tmdbApi } from '../services/tmdbApi';
import styles from '../styles/pages/Movies.module.css';

const Movies = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const [moviesData, setMoviesData] = useState({
    popular: [],
    latest: []
  });
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'popular', label: 'Popular', color: '#FF6B6B' },
    { id: 'latest', label: 'Latest', color: '#4ECDC4' }
  ];

  useEffect(() => {
    loadMoviesData();
  }, []);

  const loadMoviesData = async () => {
    setLoading(true);
    try {
      const [popularRes, latestRes] = await Promise.all([
        tmdbApi.getPopularMovies(),
        tmdbApi.getLatestMovies()
      ]);

      setMoviesData({
        popular: popularRes || [],
        latest: latestRes || []
      });
    } catch (error) {
      console.error('Error loading movies data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMovieClick = (movie) => {
    // Navigate to movie detail page
    window.location.href = `/movie/${movie.id}`;
  };

  const renderMoviesGrid = (movies) => {
    if (!movies || movies.length === 0) {
      return (
        <div className={styles.noContent}>
          <p>No movies available</p>
        </div>
      );
    }

    return (
      <div className={styles.moviesGrid}>
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className={styles.movieCard}
            onClick={() => handleMovieClick(movie)}
          >
            <div className={styles.moviePoster}>
              <img 
                src={movie.poster_url || `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                onError={(e) => {
                  e.target.src = '/placeholder-poster.jpg';
                }}
              />
              <div className={styles.movieOverlay}>
                <div className={styles.movieInfo}>
                  <h3>{movie.title}</h3>
                  <p className={styles.releaseDate}>
                    {new Date(movie.release_date).getFullYear()}
                  </p>
                  <div className={styles.rating}>
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.moviesPage}>
      <div className={styles.header}>
        <h1>Movies</h1>
        <p>Discover popular and latest movies</p>
      </div>

      <div className={styles.tabsContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
            style={{
              '--tab-color': tab.color
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading movies...</p>
          </div>
        ) : (
          <div className={styles.tabContent}>
            {renderMoviesGrid(moviesData[activeTab])}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
