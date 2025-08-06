import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';
import styles from '../styles/components/Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
