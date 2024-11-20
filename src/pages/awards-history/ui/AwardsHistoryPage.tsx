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
      // @ts-ignore
      actorSkill: movie.score.avgActorSkillWithAwards,
      // @ts-ignore
      directorSkill: movie.score.avgDirectorSkillWithAwards,
      // @ts-ignore
      lineSkill: movie.score.avgLineSkillWithAwards,
      // @ts-ignore
      musicSkill: movie.score.avgMusicSkillWithAwards,
      // @ts-ignore
      storySkill: movie.score.avgStorySkillWithAwards,
      // @ts-ignore
      sceneSkill: movie.score.avgSceneSkillWithAwards,
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
      if (
        //@ts-ignore
        winner.score.totalAverageSkillWithAwards <
        //@ts-ignore
        movies[i].score.totalAverageSkillWithAwards
      )
        winner = movies[i];
      //@ts-ignore
      if (
        //@ts-ignore
        actorWinner.score.avgActorSkillWithAwards <
        //@ts-ignore
        movies[i].score.avgActorSkillWithAwards
      )
        actorWinner = movies[i];
      if (
        //@ts-ignore
        directorWinner.score.avgDirectorSkillWithAwards <
        //@ts-ignore
        movies[i].score.avgDirectorSkillWithAwards
      )
        directorWinner = movies[i];
      //@ts-ignore
      if (
        //@ts-ignore
        sceneWinner.score.avgSceneSkillWithAwards <
        //@ts-ignore
        movies[i].score.avgSceneSkillWithAwards
      )
        sceneWinner = movies[i];
      //@ts-ignore
      if (
        //@ts-ignore
        storyWinner.score.avgStorySkillWithAwards <
        //@ts-ignore
        movies[i].score.avgStorySkillWithAwards
      )
        storyWinner = movies[i];
      //@ts-ignore
      if (
        //@ts-ignore
        musicWinner.score.avgMusicSkillWithAwards <
        //@ts-ignore
        movies[i].score.avgMusicSkillWithAwards
      )
        musicWinner = movies[i];
      //@ts-ignore
      if (
        //@ts-ignore
        lineWinner.score.avgLineSkillWithAwards <
        //@ts-ignore
        movies[i].score.avgLineSkillWithAwards
      )
        lineWinner = movies[i];
    }

    console.log(winner);

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
