import styles from '../styles/components/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.rows}>
        <img src="../src/assets/logo.png" alt="Logo" className={styles.logoFooter}/>
        <div className={styles.cols}>
            <div className={styles.col}>
                <p className={styles.footerText}>Account</p>
                <p className={styles.footerText}>Ways to Watch</p>
                <p className={styles.footerText}>Only on Netflix</p>
                <p className={styles.footerText}>Speed Test</p>
            </div>
            <div className={styles.col}>
                <p className={styles.footerText}>Account & Billing</p>
                <p className={styles.footerText}>Plans & Pricing</p>
                <p className={styles.footerText}>Cookie Preferences</p>
                <p className={styles.footerText}>Legal Notices</p>
            </div>
            <div className={styles.col}>
                <p className={styles.footerText}>Job</p>
                <p className={styles.footerText}>Media Center</p>
                <p className={styles.footerText}>Help Center</p>
                <p className={styles.footerText}>Contact Us</p>
            </div>
        </div>
      </div>
      <p className={styles.copyright}>© 2025 Hystudio. Hymovie® is a registered trademark. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
