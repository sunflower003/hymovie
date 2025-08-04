import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import styles from '../styles/components/HomeMovieList.module.css';
import LoadingSpinner from './LoadingSpinner';
import { getTrending, getLatestMovies, getLatestTVShows, getImageUrl } from '../services/tmdbApi';

const HomeMovieList = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [latestTVShows, setLatestTVShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [trending, latest, tvShows] = await Promise.all([
          getTrending('all', 'week'),
          getLatestMovies(),
          getLatestTVShows()
        ]);
        
        setTrendingMovies(trending.slice(0, 20));
        setLatestMovies(latest.slice(0, 12));
        setLatestTVShows(tvShows.slice(0, 12));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const formatYear = (date) => {
    if (!date) return 'N/A';
    return new Date(date).getFullYear();
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <LoadingSpinner size="large" />
      </div>
    );
  }
  return (
    <div>
      <div className={styles.trending}>
        <h1 className={styles.title}>Trending Now</h1>
        <div className={styles.swiperContainer}>
          {isMobile ? (
            // Mobile Grid Layout
            <div className={styles.mobileGrid}>
              {trendingMovies.map((movie) => (
                <div key={movie.id} className={styles.movieCard} onClick={() => handleMovieClick(movie)}>
                  <div className={styles.posterContainer}>
                    <img 
                      src={movie.poster_url || getImageUrl(movie.poster_path)} 
                      alt={movie.title || movie.name} 
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
                    <h2 className={styles.movieTitle}>{movie.title || movie.name}</h2>
                    <div className={styles.movieDetails}>
                      <span className={styles.year}>{formatYear(movie.release_date || movie.first_air_date)}</span>
                      <span className={styles.rating}>
                        <i className="ri-star-fill"></i>{formatRating(movie.vote_average)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Desktop Swiper
            <>
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={6}
                navigation={{
                  nextEl: `.${styles.swiperButtonNext}`,
                  prevEl: `.${styles.swiperButtonPrev}`,
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                breakpoints={{
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1200: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                  },
                }}
                className={styles.swiper}
              >
                {trendingMovies.map((movie) => (
                  <SwiperSlide key={movie.id}>
                    <div className={styles.movieCard} onClick={() => handleMovieClick(movie)}>
                      <div className={styles.posterContainer}>
                        <img 
                          src={movie.poster_url || getImageUrl(movie.poster_path)} 
                          alt={movie.title || movie.name} 
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
                        <h2 className={styles.movieTitle}>{movie.title || movie.name}</h2>
                        <div className={styles.movieDetails}>
                          <span className={styles.year}>{formatYear(movie.release_date || movie.first_air_date)}</span>
                          <span className={styles.rating}>
                            <i className="ri-star-fill"></i>{formatRating(movie.vote_average)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <div className={`${styles.swiperButtonPrev} ${styles.navButton}`}>
                <i className="ri-arrow-left-s-line"></i>
              </div>
              <div className={`${styles.swiperButtonNext} ${styles.navButton}`}>
                <i className="ri-arrow-right-s-line"></i>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.latestMovies}>
        <div className={styles.header}>
          <h1 className={styles.title}>Latest Movies</h1>
          <span className={styles.seeMore}>See More<i className="ri-arrow-right-line"></i></span>
        </div>
        <div className={styles.latestGrid}>
          {latestMovies.map((movie) => (
            <div key={`latest-${movie.id}`} className={styles.movieCard} onClick={() => handleMovieClick(movie)}>
              <div className={styles.posterContainer}>
                <img 
                  src={movie.poster_url || getImageUrl(movie.poster_path)} 
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
                  <span className={styles.year}>{formatYear(movie.release_date)}</span>
                  <span className={styles.rating}>
                    <i className="ri-star-fill"></i>{formatRating(movie.vote_average)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.latestMovies}>
        <div className={styles.header}>
          <h1 className={styles.title}>Latest TV Shows</h1>
          <span className={styles.seeMore}>See More<i className="ri-arrow-right-line"></i></span>
        </div>
        <div className={styles.latestGrid}>
          {latestTVShows.map((show) => (
            <div key={`tvshows-${show.id}`} className={styles.movieCard} onClick={() => handleMovieClick(show)}>
              <div className={styles.posterContainer}>
                <img 
                  src={show.poster_url || getImageUrl(show.poster_path)} 
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
                  <span className={styles.year}>{formatYear(show.first_air_date)}</span>
                  <span className={styles.rating}>
                    <i className="ri-star-fill"></i>{formatRating(show.vote_average)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeMovieList;