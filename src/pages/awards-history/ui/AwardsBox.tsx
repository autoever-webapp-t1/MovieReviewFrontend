import styles from "./AwardsBox.module.css";
import { AwardsMovieCardType } from "../model/types";
import AwardsMovieCard from "./AwardsMovieCard";

interface AwardsBoxProps {
  data: AwardsMovieCardType[];
}

export default function AwardsBox({ data }: AwardsBoxProps) {
  return (
    <div className={styles["awards-box"]}>
      {data.map((item, i) => (
        <AwardsMovieCard
          movie={item.movie}
          awardsName={item.awardsName}
          strong={item.strong}
          key={i}
        />
      ))}
    </div>
  );
}
