import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import ProfileImage from "./ProfileImage";

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
              <img
                src="../../../src/assets/headerSearch.svg"
                width="24"
                height="24"
              ></img>
              <input className="" type="text" placeholder="영화 제목 검색" />
            </div>
            <div className={styles.profile}>
              <ProfileImage
                src="../../../src/assets/song.jpg"
                alt=""
                size={32}
              />
              <img />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
