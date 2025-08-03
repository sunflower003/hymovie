import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/components/Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
