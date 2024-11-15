import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "@assets/logo.svg";
import UserImage from "@assets/song.jpg";
import ProfileImage from "@/widgets/profile-image";
import SearchIcon from "@/widgets/search-icon";

export default function Header() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">
            <div className={styles.logoContainer}>
              <img src={Logo} alt="로고" width="90" />
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
              <li>
                <Link to="/post-list">포스트</Link>
              </li>
            </ul>
          </nav>
          <div className={styles.headerUtilities}>
            <div className={styles.searchBar}>
              <SearchIcon />
              <input className="" type="text" placeholder="영화 제목 검색" />
            </div>
            <div className={styles.profile}>
              <ProfileImage src={UserImage} alt="" size={32} />
              <img />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
