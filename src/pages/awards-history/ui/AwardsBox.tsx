import { AwardsMovieCard } from "../model/types";
import styles from "./AwardsBox.module.css";

interface AwardsBoxProps {
  data: AwardsMovieCard[];
}

export default function AwardsBox({ data }: AwardsBoxProps) {
  return <div className={styles["awards-box"]}></div>;
}
