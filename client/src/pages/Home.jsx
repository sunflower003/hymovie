import React, { useState, useRef } from 'react';
import styles from '../styles/pages/Home.module.css';
import videoSrc from '../assets/theconjuring.mp4';
import HomeMovieList from '../components/HomeMovieList.jsx';

const Home = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle video load to ensure autoplay works
  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  };

  return (
    <div>
      <div className={styles.home}>
        <div className={styles.videoContainer}>
          <video 
            ref={videoRef}
            className={styles.backgroundVideo}
            autoPlay 
            loop 
            muted={isMuted}
            playsInline
            onLoadedData={handleVideoLoad}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          <button 
            className={styles.muteButton} 
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            <i className={isMuted ? "ri-volume-mute-line" : "ri-volume-up-line"}></i>
          </button>
        </div>
        
        <div className={styles.overlay}></div>

        <div className={styles.content}>
          <img src="https://image.tmdb.org/t/p/original/45eUDVX0gsUJuUTudCfxPicyuiI.png" alt="Logo Film" className={styles.logoFilm} />
          <div className={styles.information}>
            <div className={styles.movieStats}>
              <div className={styles.rating}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png" alt="imfb logo" className={styles.imdbLogo} />8.5</div>
              &middot;
              <p className={styles.year}>2025</p>
              &middot;
              <p className={styles.duration}>2h 15m</p>
              &middot;
              <p className={styles.match}>100% match</p>
            </div>
            <p className={styles.description}>
              The Conjuring: The Devil Made Me Do It is a 2021 American supernatural horror film directed by Michael Chaves. It is the third installment in The Conjuring series and follows paranormal investigators Ed and Lorraine Warren as they investigate
            </p>
          </div>
          <div className={styles.actions}>
            <i className={`ri-download-2-line ${styles.actionButton}`}></i>
            <button className={styles.watchButton}>
              <i className="ri-play-fill"></i> Watch Now
            </button>
            <i className={`ri-heart-fill ${styles.actionButton}`}></i>
            <i className={`ri-add-line ${styles.actionButton}`}></i>
          </div>
          <div className={styles.category}>
            <span>Horror</span>
            &middot;
            <span>Action</span>
            &middot;
            <span>Adventure</span>
          </div>
        </div>
      </div>
      <HomeMovieList />
    </div>
  );
};

export default Home;