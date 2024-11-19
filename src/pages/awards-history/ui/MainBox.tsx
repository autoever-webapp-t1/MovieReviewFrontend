import { ChartRawData } from "@/widgets/score-chart/model/types";
import ChartBox from "./ChartBox";
import styles from "./MainBox.module.css";
import AwardsMovieCard from "./AwardsMovieCard";
import { AwardsMovieCardDto } from "@/entities/awards";

interface MainBoxProps {
  chartData: ChartRawData[];
  winner: AwardsMovieCardDto;
}

export default function MainBox({ chartData, winner }: MainBoxProps) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <AwardsMovieCard awardsName="수상작" movie={winner} strong />
      </div>
      <ChartBox data={chartData} />
    </div>
  );
}
