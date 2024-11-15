import { ReactNode } from "react";
import styles from "./SplashBackground.module.css";
import SplashImg from "@assets/splash.png";

interface SplashBackgroundProps {
  children: ReactNode;
}

export default function SplashBackground({ children }: SplashBackgroundProps) {
  return (
    <div className={styles.background}>
      <img src={SplashImg} alt="SplashImg" />
      {children}
    </div>
  );
}
