import styles from "./AwardsHistoryPage.module.css";
import { useMemo, useState } from "react";
import Select from "@/widgets/select";
import { AwardsMovieCardDto } from "@/entities/awards";
import { ChartRawData } from "@/widgets/score-chart/model/types";
import AwardsBox from "./AwardsBox";
import { AwardsMovieCardType } from "../model/types";
import { usePastAwards } from "@/entities/awards/api/hooks";
import Spinner from "@/widgets/spinner";
import MainBox from "./MainBox";

export default function AwardsHistoryPage() {
  const [value, setValue] = useState(0);

  const { data: awards } = usePastAwards();
  const movies: AwardsMovieCardDto[] = useMemo(() => {
    if (awards) return awards[value].nominatedMovies;
    else return [];
  }, [awards, value]);

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

  const winnersData: AwardsMovieCardType[] = useMemo(() => {
    let winner = movies[0];
    let actorWinner = movies[0];
    let directorWinner = movies[0];
    let sceneWinner = movies[0];
    let storyWinner = movies[0];
    let musicWinner = movies[0];
    let lineWinner = movies[0];

    for (let i = 1; i < movies.length; i++) {
      if (winner.score.totalAverageSkill < movies[i].score.totalAverageSkill)
        winner = movies[i];
      if (actorWinner.score.avgActorSkill < movies[i].score.avgActorSkill)
        actorWinner = movies[i];
      if (
        directorWinner.score.avgDirectorSkill < movies[i].score.avgDirectorSkill
      )
        directorWinner = movies[i];
      if (sceneWinner.score.avgSceneSkill < movies[i].score.avgSceneSkill)
        sceneWinner = movies[i];
      if (storyWinner.score.avgStorySkill < movies[i].score.avgStorySkill)
        storyWinner = movies[i];
      if (musicWinner.score.avgMusicSkill < movies[i].score.avgMusicSkill)
        musicWinner = movies[i];
      if (lineWinner.score.avgLineSkill < movies[i].score.avgLineSkill)
        lineWinner = movies[i];
    }

    return [
      { movie: winner, awardsName: "수상작", strong: true },
      { movie: sceneWinner, awardsName: "미장센 부문" },
      { movie: actorWinner, awardsName: "연기력 부문" },
      { movie: lineWinner, awardsName: "대사 부문" },
      { movie: directorWinner, awardsName: "연출 부문" },
      { movie: musicWinner, awardsName: "음악 부문" },
      { movie: storyWinner, awardsName: "스토리 부문" },
    ];
  }, [movies]);

  return (
    <div className={styles.container}>
      {awards ? (
        <>
          <div className={styles["select-wrapper"]}>
            <Select
              items={awards.map((award) => award.awardsName)}
              selectedIdx={value}
              onChange={(e) => {
                setValue(e);
              }}
            />
          </div>
          <div className={styles.content}>
            <MainBox chartData={chartData} winner={winnersData[0].movie} />
            <AwardsBox data={winnersData.slice(1)} />
          </div>
        </>
      ) : (
        <div className={styles["spinner-wrapper"]}>
          <Spinner />
        </div>
      )}
    </div>
  );
}
