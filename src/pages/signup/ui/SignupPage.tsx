import SplashBackground from "@/widgets/splash-background";
import LogoImg from "@assets/logo.svg";
import styles from "./SignupPage.module.css";
import TextButton from "@/widgets/text-button/ui/TextButton";

export default function SignupPage() {
  return (
    <SplashBackground>
      <div className={styles["signup-box"]}>
        <div className={styles["logo-wrapper"]}>
          <img src={LogoImg} alt="LogoImg" />
        </div>
        <div className={`${styles.title} header-h2`}>
          좋아하는 영화를 골라주세요
          <div className={styles["button-wrapper"]}>
            <TextButton color="primary" onClick={() => {}}>
              asdf
            </TextButton>
          </div>
        </div>
      </div>
    </SplashBackground>
  );
}
