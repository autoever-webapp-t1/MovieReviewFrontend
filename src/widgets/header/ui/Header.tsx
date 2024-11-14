import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">
            <div className={styles.logoContainer}>
              <img
                src="../../../src/assets/gasannes_logo_f3bb4b_notext.svg"
                alt="로고"
                width="90"
              />
            </div>
          </Link>
        </div>
        <div className={styles.headerMenu}>
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link to="/">리뷰</Link>
              </li>
              <li>
                <Link to="/awards">어워드</Link>
              </li>
            </ul>
          </nav>
          <div className={styles.headerUtilities}>
            <div className={styles.searchBar}>
              <button type="submit">
                <img
                  src="../../../src/assets/headerSearch.svg"
                  width="24"
                  height="24"
                ></img>
              </button>
              <input className="" type="text" placeholder="영화 제목 검색" />
            </div>
            <div className={styles.profile}>
              <img
                src="../../../src/assets/song.jpg"
                alt=""
                width="32"
                height="32"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
