import TextLogoImg from "@assets/logo_text.svg";
import KakaoLoginButtonImg from "@assets/kakao_login_button.png";
import styles from "./LoginPage.module.css";
import SplashBackground from "@/widgets/splash-background";

export default function LoginPage() {
  return (
    <SplashBackground>
      <div className={styles["login-box"]}>
        <div className={styles["logo-wrapper"]}>
          <img src={TextLogoImg} alt="LogoImg" />
        </div>
        <button className={styles["login-button"]}>
          <img src={KakaoLoginButtonImg} alt="KakaoLoginButtonImg" />
        </button>
      </div>
    </SplashBackground>
  );
}
