import React from 'react';
import styles from '../styles/components/LoadingSpinner.module.css';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`${styles.spinner} ${styles[size]} ${className}`}>
      <div className={styles.circle}></div>
    </div>
  );
};

export default LoadingSpinner;
