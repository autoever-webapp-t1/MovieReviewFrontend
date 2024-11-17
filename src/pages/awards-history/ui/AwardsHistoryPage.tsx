import styles from "./AwardsHistoryPage.module.css";
import { useMemo, useState } from "react";
import Select from "@/widgets/select";
import ChartBox from "./ChartBox";
import { AwardsMovieCardDto } from "@/entities/awards";
import { ChartRawData } from "@/widgets/score-chart/model/types";

const movies: AwardsMovieCardDto[] = [
  {
    movieId: 1,
    movieTitle: "재밌는 영화",
    score: {
      avgSceneSkill: 5.0,
      totalAverageSkill: 5.0,
      avgLineSkill: 5.0,
      avgStorySkill: 5.0,
      avgDirectorSkill: 5.0,
      avgMusicSkill: 5.0,
      avgActorSkill: 5.0,
    },
  },
  {
    movieId: 2,
    movieTitle: "슬픈 영화",
    score: {
      avgSceneSkill: 7.0,
      totalAverageSkill: 5.0,
      avgLineSkill: 8.0,
      avgStorySkill: 9.0,
      avgDirectorSkill: 4.0,
      avgMusicSkill: 4.0,
      avgActorSkill: 3.0,
    },
  },
  {
    movieId: 3,
    movieTitle: "액션 영화",
    score: {
      avgSceneSkill: 1.0,
      totalAverageSkill: 5.0,
      avgLineSkill: 2.0,
      avgStorySkill: 1.0,
      avgDirectorSkill: 9.0,
      avgMusicSkill: 9.0,
      avgActorSkill: 10.0,
    },
  },
  {
    movieId: 4,
    movieTitle: "공포 영화",
    score: {
      avgSceneSkill: 4.0,
      totalAverageSkill: 5.0,
      avgLineSkill: 1.0,
      avgStorySkill: 1.0,
      avgDirectorSkill: 10.0,
      avgMusicSkill: 10.0,
      avgActorSkill: 8.0,
    },
  },
];

export default function AwardsHistoryPage() {
  const [value, setValue] = useState(0);

  const chartData: ChartRawData[] = useMemo(() => {
    return movies.map<ChartRawData>((movie) => ({
      movieTitle: movie.movieTitle,
      actorSkill: movie.score.avgActorSkill,
      directorSkill: movie.score.avgDirectorSkill,
      lineSkill: movie.score.avgLineSkill,
      musicSkill: movie.score.avgMusicSkill,
      storySkill: movie.score.avgStorySkill,
      sceneSkill: movie.score.avgSceneSkill,
    }));
  }, [movies]);

  return (
    <div className={styles.container}>
      <div className={styles["select-wrapper"]}>
        <Select
          items={[
            "제 11회 고전 공포 어워즈",
            "제 12회 고전 명작 어워즈",
            "제 13회 공포 영화 어워즈",
            "제 14회 고전 공포 어워즈",
            "제 15회 고전 명작 어워즈",
            "제 16회 공포 영화 어워즈",
          ]}
          selectedIdx={value}
          onChange={(e) => {
            setValue(e);
          }}
        />
      </div>
      <div className={styles.content}>
        <ChartBox data={chartData} />
      </div>
    </div>
  );
}
