import ScoreChart from "@/widgets/score-chart";
import styles from "./MovieInfo.module.css";
import { useCallback, useMemo } from "react";
import {
  GenreDto,
  ImageDto,
  MyScore,
  ReviewDetailDto,
  Score,
} from "@/entities/movie";
import { ChartRawData } from "@/widgets/score-chart/model/types";
import { useModalStore } from "@/widgets/app-modal/model/store";

interface MovieInfoProps {
  movieId: number;
  title: string;
  images: ImageDto[];
  genres: GenreDto[];
  releaseDate: string;
  runningTime: number;
  overview: string;
  score: Score;
  myScore: MyScore | null;
  myReview: ReviewDetailDto | null;
}

export default function MovieInfo({
  movieId,
  title,
  images,
  genres,
  releaseDate,
  runningTime,
  overview,
  score,
  myScore,
  myReview,
}: MovieInfoProps) {
  const { setOpenModal } = useModalStore();

  const runningTimeStr = useMemo(() => {
    const h = Math.floor(runningTime / 60);
    const m = runningTime % 60;

    return h === 0 ? `${m}분` : `${h}시간 ${m}분`;
  }, [runningTime]);

  const chartData = useMemo(() => {
    const newChartData: ChartRawData[] = [];

    newChartData.push({
      movieTitle: title,
      actorSkill: score.avgActorSkill,
      lineSkill: score.avgLineSkill,
      directorSkill: score.avgDirectorSkill,
      musicSkill: score.avgMusicSkill,
      sceneSkill: score.avgSceneSkill,
      storySkill: score.avgStorySkill,
    });

    if (myScore) {
      newChartData.push({
        movieTitle: title,
        actorSkill: myScore.actorSkill,
        lineSkill: myScore.lineSkill,
        directorSkill: myScore.directorSkill,
        musicSkill: myScore.musicSkill,
        sceneSkill: myScore.sceneSkill,
        storySkill: myScore.storySkill,
      });
    }

    return newChartData;
  }, [title, score, myScore]);

  const handleRatingButtonClick = useCallback(() => {
    setOpenModal("ratingModal", {
      movieId,
      myReview,
    });
  }, [setOpenModal, movieId, myReview]);

  return (
    <div className={styles.info}>
      <div className={styles["movie-img-wrapper"]}>
        <img
          src={`https://image.tmdb.org/t/p/w780${images[0].backdrop_path}`}
          alt="MovieImg"
        />
      </div>
      <div className={styles["info-content"]}>
        <h1 className="header-h1">{title}</h1>
        <p className="text-md text-regular">
          {releaseDate.substring(0, 4)} | {runningTimeStr} |{" "}
          {genres.map((genre) => genre.name).join(", ")}
        </p>
        <p className="text-md text-regular">{overview}</p>
        <div className={`${styles["score-text"]} text-bold text-lg`}>
          <span className={styles["avg-score"]}>
            평균 총점 {score.totalAverageSkill}
          </span>
          <span className={styles["my-score"]}>
            나의 총점{" "}
            <button
              className={`${styles["score-button"]}`}
              onClick={handleRatingButtonClick}
            >
              {myScore ? myScore.avgSkill : "평가하기"}
            </button>
          </span>
        </div>
        <div className={styles["chart-wrapper"]}>
          <ScoreChart size="small" data={chartData} />
        </div>
      </div>
    </div>
  );
}
