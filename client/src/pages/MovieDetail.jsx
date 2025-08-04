import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from '../styles/pages/MovieDetail.module.css';
import { getMovieDetails, getTVShowDetails, getImageUrl } from '../services/tmdbApi';
import ErrorBoundary from '../components/ErrorBoundary';
import VideoPlayer from '../components/VideoPlayer';
import LoadingSpinner from '../components/LoadingSpinner';
import { getVideoEmbedUrl } from '../utils/videoUtils';

const MovieDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);

  // Get data from state (passed from navigation) or default to movie type
  const { movieData: passedData, mediaType, title } = location.state || {};
  const currentMediaType = mediaType || 'movie';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        let details;
        if (currentMediaType === 'tv') {
          details = await getTVShowDetails(id);
        } else {
          details = await getMovieDetails(id);
        }

        if (details) {
          setMovieData(details);
        } else {
          setError('Movie not found');
        }
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id, currentMediaType]);

  const formatDuration = (runtime) => {
    if (!runtime) return 'N/A';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const formatGenres = (genres) => {
    if (!genres || genres.length === 0) return 'N/A';
    return genres.map(genre => genre.name).join(', ');
  };

  const formatDirector = (crew) => {
    if (!crew || crew.length === 0) return 'N/A';
    const directors = crew.filter(person => person.job === 'Director');
    return directors.length > 0 ? directors.map(director => director.name).join(', ') : 'N/A';
  };

  const formatCast = (cast) => {
    if (!cast || cast.length === 0) return 'N/A';
    return cast.slice(0, 5).map(actor => actor.name).join(', ');
  };

  const formatCountries = (countries) => {
    if (!countries || countries.length === 0) return 'N/A';
    return countries.map(country => country.iso_3166_1).join(', ');
  };

  if (loading) {
    return (
      <div className={styles.movieDetail}>
        <div className={styles.loading}>
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.movieDetail}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className={styles.movieDetail}>
        <div className={styles.error}>Movie not found</div>
      </div>
    );
  }

  const movieTitle = movieData.title || movieData.name;
  const releaseDate = movieData.release_date || movieData.first_air_date;
  const runtime = movieData.runtime || (movieData.episode_run_time && movieData.episode_run_time[0]);

  return (
    <ErrorBoundary>
      <div className={styles.movieDetail}>
        <p className={styles.movieName}>
          <span>{currentMediaType === 'tv' ? 'TV Show' : 'Movie'} /</span> {movieTitle}
        </p>
        <ErrorBoundary>
          <VideoPlayer 
            src={movieData?.vidsrc_url || getVideoEmbedUrl({
              tmdbId: movieData?.id,
              mediaType: currentMediaType,
              season: selectedSeason,
              episode: selectedEpisode,
              options: { autoplay: true, autonext: currentMediaType === 'tv' }
            })}
            title={movieTitle}
            movieId={movieData?.id}
            mediaType={currentMediaType}
            season={selectedSeason}
            episode={selectedEpisode}
          />
        </ErrorBoundary>
        <div className={styles.movieInfo}>
          <img 
            src={movieData.poster_url || getImageUrl(movieData.poster_path)} 
            alt="Poster" 
            className={styles.moviePoster}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
            }}
          />
          <div className={styles.movieDetails}>
            <h1>{movieTitle}</h1>
            <div className={styles.resoAndRating}>
              <span className={styles.resolution}>FHD</span>
              <span className={styles.rating}>IMDB: {movieData.vote_average ? movieData.vote_average.toFixed(1) : 'N/A'}</span>
            </div>
            <p className={styles.description}>
              {movieData.overview || 'No description available.'}
            </p>
            <p className={styles.infoMeta}>
              <span>Released:</span> {releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}
            </p>
            <p className={styles.infoMeta}>
              <span>Country:</span> {formatCountries(movieData.production_countries)}
            </p>
            <p className={styles.infoMeta}>
              <span>Genre:</span> {formatGenres(movieData.genres)}
            </p>
            <p className={styles.infoMeta}>
              <span>Director:</span> {formatDirector(movieData.credits?.crew)}
            </p>
            <p className={styles.infoMeta}>
              <span>Cast:</span> {formatCast(movieData.credits?.cast)}
            </p>
            <p className={styles.infoMeta}>
              <span>Duration:</span> {formatDuration(runtime)}
            </p>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default MovieDetail;