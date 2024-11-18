import styles from "./AwardsHistoryPage.module.css";
import { useMemo, useState } from "react";
import Select from "@/widgets/select";
import ChartBox from "./ChartBox";
import { AwardsMovieCardDto, AwardsPastListDto } from "@/entities/awards";
import { ChartRawData } from "@/widgets/score-chart/model/types";
import AwardsBox from "./AwardsBox";
import { AwardsMovieCardType } from "../model/types";

const movies: AwardsMovieCardDto[] = [
  {
    movieId: 1,
    movieTitle: "재밌는 영화",
    posterPath:
      "https://i.namu.wiki/i/hwTmapI5x7fN8IuqFHO4HfoFeItPIRL5V2NBdqFtuc9CWJUGeKbMCNLCEq3u1ZIlINTrzA9xr81_aX_v7b8hng.webp",
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
    posterPath:
      "https://i.namu.wiki/i/hwTmapI5x7fN8IuqFHO4HfoFeItPIRL5V2NBdqFtuc9CWJUGeKbMCNLCEq3u1ZIlINTrzA9xr81_aX_v7b8hng.webp",
    score: {
      avgSceneSkill: 7.0,
      totalAverageSkill: 5.84,
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
    posterPath:
      "https://i.namu.wiki/i/hwTmapI5x7fN8IuqFHO4HfoFeItPIRL5V2NBdqFtuc9CWJUGeKbMCNLCEq3u1ZIlINTrzA9xr81_aX_v7b8hng.webp",
    score: {
      avgSceneSkill: 1.0,
      totalAverageSkill: 5.33,
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
    posterPath:
      "https://i.namu.wiki/i/hwTmapI5x7fN8IuqFHO4HfoFeItPIRL5V2NBdqFtuc9CWJUGeKbMCNLCEq3u1ZIlINTrzA9xr81_aX_v7b8hng.webp",
    score: {
      avgSceneSkill: 4.0,
      totalAverageSkill: 5.67,
      avgLineSkill: 1.0,
      avgStorySkill: 1.0,
      avgDirectorSkill: 10.0,
      avgMusicSkill: 10.0,
      avgActorSkill: 8.0,
    },
  },
];

const awards: AwardsPastListDto[] = [
  {
    awardsId: 5,
    awardsName: "제 15회 고전 공포 어워즈",
    nominatedMovies: movies,
  },
  {
    awardsId: 4,
    awardsName: "제 14회 고전 공포 어워즈",
    nominatedMovies: movies,
  },
  {
    awardsId: 3,
    awardsName: "제 13회 고전 공포 어워즈",
    nominatedMovies: movies,
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
        <ChartBox data={chartData} />
        <AwardsBox data={[winnersData[0]]} />
        <AwardsBox data={winnersData.slice(1)} />
      </div>
    </div>
  );
}
