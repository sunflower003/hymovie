import React, { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top coordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="back-to-top">
      <button
        type="button"
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: 'linear-gradient(135deg, #e50914, #b20710)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          zIndex: 1000,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(100px)',
          visibility: isVisible ? 'visible' : 'hidden'
        }}
        onMouseEnter={(e) => {
          e.target.style.opacity = '1';
          e.target.style.transform = isVisible ? 'translateY(0) scale(1.1)' : 'translateY(100px) scale(0.8)';
        }}
        onMouseLeave={(e) => {
          e.target.style.opacity = isVisible ? '1' : '0';
          e.target.style.transform = isVisible ? 'translateY(0) scale(1)' : 'translateY(100px) scale(0.8)';
        }}
      >
        <i className="ri-arrow-up-line"></i>
      </button>
    </div>
  );
};

export default BackToTop;
