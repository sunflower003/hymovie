import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import styles from '../styles/components/HomeMovieList.module.css';

const HomeMovieList = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const movies = [
    {
      id: 1,
      title: "Arcane",
      year: "2025",
      rating: "8.9",
      poster: "https://m.media-amazon.com/images/M/MV5BODI0ZTljYTMtODQ1NC00NmI0LTk1YWUtN2FlNDM1MDExMDlhXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_.jpg"
    },
    {
      id: 2,
      title: "Money Heist",
      year: "2018",
      rating: "8.7",
      poster: "https://m.media-amazon.com/images/M/MV5BODI0ZTljYTMtODQ1NC00NmI0LTk1YWUtN2FlNDM1MDExMDlhXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_.jpg"
    },
    {
      id: 3,
      title: "Stranger Things",
      year: "2016",
      rating: "8.8",
      poster: "https://m.media-amazon.com/images/M/MV5BN2ZmYjg1YmItNWQ4OC00YWM0LWE0ZDktYThjOTZiZjhhN2Q2XkEyXkFqcGdeQXVyNjgxNTQ3Mjk@._V1_.jpg"
    },
    {
      id: 4,
      title: "Wednesday",
      year: "2022",
      rating: "8.1",
      poster: "https://m.media-amazon.com/images/M/MV5BM2ZmMjEyZmYtOGM4YS00YTNhLWE3ZDMtNzQxM2RhNjBlODIyXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg"
    },
    {
      id: 5,
      title: "The Witcher",
      year: "2019",
      rating: "8.2",
      poster: "https://m.media-amazon.com/images/M/MV5BODI0ZTljYTMtODQ1NC00NmI0LTk1YWUtN2FlNDM1MDExMDlhXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_.jpg"
    },
    {
      id: 6,
      title: "Dark",
      year: "2017",
      rating: "8.8",
      poster: "https://m.media-amazon.com/images/M/MV5BODI0ZTljYTMtODQ1NC00NmI0LTk1YWUtN2FlNDM1MDExMDlhXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_.jpg"
    },
    {
      id: 7,
      title: "Breaking Bad",
      year: "2008",
      rating: "9.5",
      poster: "https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg"
    },
    {
      id: 8,
      title: "Squid Game",
      year: "2021",
      rating: "8.0",
      poster: "https://m.media-amazon.com/images/M/MV5BYWE3MDVkN2EtNjQ5MS00ZDQ4LTliNzYtMjc2YWMzMDEwMTA3XkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg"
    },
    {
      id: 9,
      title: "The Crown",
      year: "2016",
      rating: "8.7",
      poster: "https://m.media-amazon.com/images/M/MV5BODI0ZTljYTMtODQ1NC00NmI0LTk1YWUtN2FlNDM1MDExMDlhXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_.jpg"
    },
    {
      id: 10,
      title: "Ozark",
      year: "2017",
      rating: "8.4",
      poster: "https://m.media-amazon.com/images/M/MV5BODI0ZTljYTMtODQ1NC00NmI0LTk1YWUtN2FlNDM1MDExMDlhXkEyXkFqcGdeQXVyMTM0NTUzNDIy._V1_.jpg"
    }
  ];

  return (
    <div>
      <div className={styles.trending}>
        <h1 className={styles.title}>Trending Now</h1>
        <div className={styles.swiperContainer}>
          {isMobile ? (
            // Mobile Grid Layout
            <div className={styles.mobileGrid}>
              {movies.map((movie) => (
                <div key={movie.id} className={styles.movieCard}>
                  <div className={styles.posterContainer}>
                    <img src={movie.poster} alt={movie.title} className={styles.moviePoster} />
                    <div className={styles.playOverlay}>
                      <div className={styles.playButton}>
                        <i className="ri-play-fill"></i>
                      </div>
                    </div>
                  </div>
                  <div className={styles.movieInfo}>
                    <h2 className={styles.movieTitle}>{movie.title}</h2>
                    <div className={styles.movieDetails}>
                      <span className={styles.year}>{movie.year}</span>
                      <span className={styles.rating}>
                        <i className="ri-star-fill"></i>{movie.rating}
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
                  delay: 5000,
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
                {movies.map((movie) => (
                  <SwiperSlide key={movie.id}>
                    <div className={styles.movieCard}>
                      <div className={styles.posterContainer}>
                        <img src={movie.poster} alt={movie.title} className={styles.moviePoster} />
                        <div className={styles.playOverlay}>
                          <div className={styles.playButton}>
                            <i className="ri-play-fill"></i>
                          </div>
                        </div>
                      </div>
                      <div className={styles.movieInfo}>
                        <h2 className={styles.movieTitle}>{movie.title}</h2>
                        <div className={styles.movieDetails}>
                          <span className={styles.year}>{movie.year}</span>
                          <span className={styles.rating}>
                            <i className="ri-star-fill"></i>{movie.rating}
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
          {movies.concat(movies.slice(0, 2)).map((movie, index) => (
            <div key={`latest-${movie.id}-${index}`} className={styles.movieCard}>
              <div className={styles.posterContainer}>
                <img src={movie.poster} alt={movie.title} className={styles.moviePoster} />
                <div className={styles.playOverlay}>
                  <div className={styles.playButton}>
                    <i className="ri-play-fill"></i>
                  </div>
                </div>
              </div>
              <div className={styles.movieInfo}>
                <h2 className={styles.movieTitle}>{movie.title}</h2>
                <div className={styles.movieDetails}>
                  <span className={styles.year}>{movie.year}</span>
                  <span className={styles.rating}>
                    <i className="ri-star-fill"></i>{movie.rating}
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
          {movies.concat(movies.slice(0, 2)).map((movie, index) => (
            <div key={`tvshows-${movie.id}-${index}`} className={styles.movieCard}>
              <div className={styles.posterContainer}>
                <img src={movie.poster} alt={movie.title} className={styles.moviePoster} />
                <div className={styles.playOverlay}>
                  <div className={styles.playButton}>
                    <i className="ri-play-fill"></i>
                  </div>
                </div>
              </div>
              <div className={styles.movieInfo}>
                <h2 className={styles.movieTitle}>{movie.title}</h2>
                <div className={styles.movieDetails}>
                  <span className={styles.year}>{movie.year}</span>
                  <span className={styles.rating}>
                    <i className="ri-star-fill"></i>{movie.rating}
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