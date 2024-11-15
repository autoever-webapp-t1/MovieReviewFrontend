import SplashImg from "@assets/splash.png";
import TextLogoImg from "@assets/gasannes_logo_f3bb4b.svg";
import KakaoLoginButtonImg from "@assets/kakao_login_button.png";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={styles.background}>
      <img src={SplashImg} alt="SplashImg" />
      <div className={styles["login-box"]}>
        <div className={styles["logo-wrapper"]}>
          <img src={TextLogoImg} alt="LogoImg" />
        </div>
        <button className={styles["login-button"]}>
          <img src={KakaoLoginButtonImg} alt="KakaoLoginButtonImg" />
        </button>
      </div>
    </div>
  );
}
