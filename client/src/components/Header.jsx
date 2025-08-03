import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/components/Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleCategoryHover = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setIsCategoryDropdownOpen(true);
  };

  const handleCategoryLeave = () => {
    const timeout = setTimeout(() => {
      setIsCategoryDropdownOpen(false);
    }, 200); // 200ms delay
    setDropdownTimeout(timeout);
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleNavigate = (path) => {
    navigate(path);
    closeMenu();
  };

  return (
    <header className={styles.header}>
        <div>
          <img 
            src="../src/assets/logo.png" 
            alt="Hymovie Logo" 
            className={styles.logo} 
            onClick={handleHomeClick}
            style={{ cursor: 'pointer' }}
          />
          <i className={`ri-menu-line ${styles.hamburgerMenu}`} onClick={toggleMenu}></i>
        </div>
        
        <ul className={styles.links}>
            <li className={styles.link} onClick={handleHomeClick} style={{ cursor: 'pointer' }}>Home</li>
            <li className={styles.link} onClick={() => handleNavigate('/tv-shows')} style={{ cursor: 'pointer' }}>TV Shows</li>
            <li className={styles.link} onClick={() => handleNavigate('/movies')} style={{ cursor: 'pointer' }}>Movies</li>
            <li className={styles.link}>News</li>
            <li className={styles.link}>My list</li>
            <li 
              className={styles.link}
              onMouseEnter={handleCategoryHover}
              onMouseLeave={handleCategoryLeave}
            >
              Category
              <i className="ri-arrow-down-s-line"></i>
            </li>
            <li className={styles.link}>Friends</li>
        </ul>
        
        <div className={styles.search}>
            <input type="text" placeholder="Search..." className={styles.searchInput} />
            <i className="ri-search-line"></i>
        </div>
        
        {/* Category Dropdown */}
        {isCategoryDropdownOpen && (
          <div 
            className={styles.categoryDropdown}
            onMouseEnter={handleCategoryHover}
            onMouseLeave={handleCategoryLeave}
          >
            <div className={styles.dropdownContent}>
              <div className={styles.dropdownSection}>
                <h3>Genres</h3>
                <ul>
                  <li>Action</li>
                  <li>Comedy</li>
                  <li>Drama</li>
                  <li>Horror</li>
                  <li>Romance</li>
                  <li>Sci-Fi</li>
                </ul>
              </div>
              <div className={styles.dropdownSection}>
                <h3>Year</h3>
                <ul>
                  <li>2024</li>
                  <li>2023</li>
                  <li>2022</li>
                  <li>2021</li>
                  <li>2020</li>
                  <li>Older</li>
                </ul>
              </div>
              <div className={styles.dropdownSection}>
                <h3>Country</h3>
                <ul>
                  <li>USA</li>
                  <li>Korea</li>
                  <li>Japan</li>
                  <li>China</li>
                  <li>India</li>
                  <li>Europe</li>
                </ul>
              </div>
              <div className={styles.dropdownSection}>
                <h3>Popular</h3>
                <ul>
                  <li>Top Rated</li>
                  <li>Most Viewed</li>
                  <li>Recently Added</li>
                  <li>Trending</li>
                  <li>Award Winners</li>
                  <li>Critics Choice</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Overlay */}
        {isMenuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
        
        <aside className={`${styles.aside} ${isMenuOpen ? styles.asideOpen : ''}`}>
            <i className="ri-close-large-line" onClick={closeMenu}></i>
            <ul className={styles.hamburgerLinks}>
                <li className={styles.hamburgerLink} onClick={handleHomeClick}>Home</li>
                <li className={styles.hamburgerLink} onClick={() => handleNavigate('/tv-shows')}>TV Shows</li>
                <li className={styles.hamburgerLink} onClick={() => handleNavigate('/movies')}>Movies</li>
                <li className={styles.hamburgerLink}>News</li>
                <li className={styles.hamburgerLink}>My list</li>
                <li className={styles.hamburgerLink}>Collection</li>
                <li className={styles.hamburgerLink}>Friends</li>
            </ul>
        </aside>
    </header>
  );
};

export default Header;
