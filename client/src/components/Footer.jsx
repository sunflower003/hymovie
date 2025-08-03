import styles from '../styles/components/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.rows}>
        <img src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1e7-7c0f-ad43-c485b7d9a221/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="Logo" className={styles.logoFooter}/>
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
