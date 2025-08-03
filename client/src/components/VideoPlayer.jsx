import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/pages/MovieDetail.module.css';

const VideoPlayer = ({ src, title, movieId, mediaType = 'movie' }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const iframeRef = useRef(null);

  // Fallback URLs with better error handling
  const fallbackSources = [
    `https://vidsrc.to/embed/${mediaType}/${movieId}`,
    `https://vidsrc.xyz/embed/${mediaType}?tmdb=${movieId}`,
    `https://vidsrc.cc/v2/embed/${mediaType}/${movieId}`,
    `https://embed.su/embed/${mediaType}/${movieId}`
  ];

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let loadTimeout;

    const handleLoad = () => {
      clearTimeout(loadTimeout);
      // Add delay to ensure iframe content is fully loaded
      setTimeout(() => {
        setLoading(false);
        setError(false);
      }, 1000);
    };

    const handleError = () => {
      clearTimeout(loadTimeout);
      console.log(`Error loading video from: ${currentSrc}`);
      
      // Try next fallback source
      if (retryCount < fallbackSources.length - 1) {
        const nextSrc = fallbackSources[retryCount + 1];
        console.log(`Trying fallback source: ${nextSrc}`);
        setCurrentSrc(nextSrc);
        setRetryCount(prev => prev + 1);
        setLoading(true);
        return;
      }
      
      setLoading(false);
      setError(true);
    };

    // Set timeout for loading
    loadTimeout = setTimeout(() => {
      console.log(`Loading timeout for: ${currentSrc}`);
      handleError();
    }, 30000); // 30 seconds timeout

    iframe.addEventListener('load', handleLoad);
    iframe.addEventListener('error', handleError);

    // Suppress console errors from iframe in production
    if (import.meta.env.PROD) {
      const originalConsoleError = console.error;
      console.error = (...args) => {
        const message = args[0]?.toString() || '';
        if (
          message.includes('aclib') ||
          message.includes('histats') ||
          message.includes('DisableDevtool') ||
          message.includes('cast_sender') ||
          message.includes('chrome-extension') ||
          message.includes('Failed to load resource') ||
          message.includes('net::ERR_BLOCKED_BY_CLIENT') ||
          message.includes('Blocked a frame') ||
          message.includes('Mixed Content')
        ) {
          return;
        }
        originalConsoleError.apply(console, args);
      };

      return () => {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
        console.error = originalConsoleError;
        clearTimeout(loadTimeout);
      };
    }

    return () => {
      iframe.removeEventListener('load', handleLoad);
      iframe.removeEventListener('error', handleError);
      clearTimeout(loadTimeout);
    };
  }, [currentSrc, retryCount, fallbackSources]);

  if (error) {
    return (
      <div className={styles.videoError}>
        <div className={styles.errorContent}>
          <h3>Video Player Error</h3>
          <p>Unable to load the video from available sources.</p>
          <p>Tried {retryCount + 1} of {fallbackSources.length} sources.</p>
          <button 
            onClick={() => {
              setError(false);
              setLoading(true);
              setRetryCount(0);
              setCurrentSrc(fallbackSources[0]);
            }}
            className={styles.retryButton}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.videoContainer}>
      {loading && (
        <div className={styles.videoLoading}>
          <div className={styles.spinner}></div>
          <p>Loading video player...</p>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={currentSrc}
        title={title}
        allowFullScreen={true}
        className={styles.movieIframe}
        loading="lazy"
        style={{ opacity: loading ? 0 : 1 }}
      />
    </div>
  );
};

export default VideoPlayer;
