import ScoreChart from "@/widgets/score-chart";
import styles from "./ChartBox.module.css";
import { ChartRawData } from "@/widgets/score-chart/model/types";

interface ChartBoxProps {
  data: ChartRawData[];
}

export default function ChartBox({ data }: ChartBoxProps) {
  return (
    <div className={styles["chart-box"]}>
      <div className={styles["chart-wrapper"]}>
        <ScoreChart size="big" data={data} />
      </div>
      <div className={styles.legend}>
        {data.map((movie, i) => (
          <div className={styles["legend-item"]} key={i}>
            <div className={`${styles.point} ${styles[`idx-${i}`]}`} />
            <div
              className={`${styles["legend-item-title"]} text-regular text-md`}
            >
              {movie.movieTitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
