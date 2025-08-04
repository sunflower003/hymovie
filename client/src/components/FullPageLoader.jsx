import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import styles from '../styles/components/LoadingSpinner.module.css';

const FullPageLoader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <LoadingSpinner size="xlarge" />
    </div>
  );
};

export default FullPageLoader;
