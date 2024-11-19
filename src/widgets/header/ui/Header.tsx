import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "@assets/logo.svg";
import ProfileImage from "@/widgets/profile-image";
import SearchIcon from "@mui/icons-material/Search";
import { useRef } from "react";

function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
  let timeout: number | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

export default function Header() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userProfile = sessionStorage.getItem("userProfile");

  const handleClick = () => {
    inputRef.current?.focus();
    if (location.pathname !== "/search") {
      navigate("/search");
    }
  };

  const debouncedNavigate = debounce((term: string) => {
    if (term.trim()) {
      navigate(`/search?query=${term}`);
    } else {
      navigate("/search");
    }
  }, 1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    debouncedNavigate(term);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/main">
            <div className={styles.logoContainer}>
              <img src={Logo} alt="로고" width="90" />
            </div>
          </Link>
        </div>
        <div className={styles.headerMenu}>
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link to="/awards">어워드</Link>
              </li>
              <li>
                <Link to="/post-list">포스트</Link>
              </li>
            </ul>
          </nav>
          <div className={styles.headerUtilities}>
            <div className={styles.searchBar} onClick={handleClick}>
              <SearchIcon sx={{ color: "var(--color-gray-500)" }} />
              <input
                className=""
                type="text"
                placeholder="영화 제목 검색"
                ref={inputRef}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.profile} onClick={() => navigate("/user")}>
              <ProfileImage
                src={
                  userProfile ||
                  "http://img1.kakaocdn.net/thumb/R640x640.q70/?fname=http://t1.kakaocdn.net/account_images/default_profile.jpeg"
                }
                alt=""
                size={32}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
