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
            <li>Privacy Policy</li>
            <li>Contact Us</li>
          </ul>
        </nav>
        <div className={styles.footerCopyright}>
          <p>서울 금천구 가산디지털1로 189 (주)LG 가산 디지털센터</p>
          <p>© 2024 Gasannes. All rights reserved. </p>
        </div>
      </div>
    </footer>
  );
}
