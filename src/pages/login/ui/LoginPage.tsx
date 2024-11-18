import TextLogoImg from "@assets/logo_text.svg";
import KakaoLoginButtonImg from "@assets/kakao_login_button.png";
import styles from "./LoginPage.module.css";
import SplashBackground from "@/widgets/splash-background";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <SplashBackground>
      <div className={styles["login-box"]}>
        <div className={styles["logo-wrapper"]}>
          <img src={TextLogoImg} alt="LogoImg" />
        </div>
        <Link
          to={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
            import.meta.env.VITE_CLIENT_ID
          }&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}`}
          className={styles["login-button"]}
        >
          <img src={KakaoLoginButtonImg} alt="KakaoLoginButtonImg" />
        </Link>
      </div>
    </SplashBackground>
  );
}
