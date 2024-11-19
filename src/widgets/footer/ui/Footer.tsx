import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // 부드럽게 상단으로 이동
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogo}>
          <Link to="/main" onClick={handleScrollToTop}>
            <p className={styles.logoText}>Gasannes</p>
          </Link>
        </div>
        <nav className={styles.footerNav}>
          <ul>
            <li>무슨 내용 적을까요</li>
            <li>Privacy Policy</li>
            <li>Contact Us</li>
          </ul>
        </nav>
        <div className={styles.footerCopyright}>
          <p>© 2024 Gasannes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
