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
          to="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=7afd832d40c601c8d991c2096ac2b039&redirect_uri=http://localhost:5173/login/oauth/kakao"
          className={styles["login-button"]}
        >
          <img src={KakaoLoginButtonImg} alt="KakaoLoginButtonImg" />
        </Link>
      </div>
    </SplashBackground>
  );
}
