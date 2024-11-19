import ScoreChart from "@/widgets/score-chart";
import styles from "./MovieInfo.module.css";
import { useCallback, useMemo } from "react";
import {
  AwardsAllScoreDto,
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
  isNominated: boolean;
  awardsAllScoreDto: AwardsAllScoreDto | null;
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
  isNominated,
  awardsAllScoreDto,
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
        actorSkill: myScore.myActorSkill,
        lineSkill: myScore.myLineSkill,
        directorSkill: myScore.myDirectorSkill,
        musicSkill: myScore.myMusicSkill,
        sceneSkill: myScore.mySceneSkill,
        storySkill: myScore.myStorySkill,
      });
    }

    return newChartData;
  }, [title, score, myScore]);

  const awardsChartData = useMemo(() => {
    if (!awardsAllScoreDto) return [];
    const newChartData: ChartRawData[] = [];
    const { awardsScore, awardsMyScore } = awardsAllScoreDto;

    newChartData.push({
      movieTitle: title,
      actorSkill: awardsScore.avgActorSkillWithAwards,
      lineSkill: awardsScore.avgLineSkillWithAwards,
      directorSkill: awardsScore.avgDirectorSkillWithAwards,
      musicSkill: awardsScore.avgMusicSkillWithAwards,
      sceneSkill: awardsScore.avgSceneSkillWithAwards,
      storySkill: awardsScore.avgStorySkillWithAwards,
    });

    if (awardsMyScore.avgSkillWithMyAwards) {
      newChartData.push({
        movieTitle: title,
        actorSkill: awardsMyScore.myActorSkillWithMyAwards,
        lineSkill: awardsMyScore.myLineSkillWithMyAwards,
        directorSkill: awardsMyScore.myDirectorSkillWithMyAwards,
        musicSkill: awardsMyScore.myMusicSkillWithMyAwards,
        sceneSkill: awardsMyScore.mySceneSkillWithMyAwards,
        storySkill: awardsMyScore.myStorySkillWithMyAwards,
      });
    }

    return newChartData;
  }, [title, awardsAllScoreDto]);

  const handleRatingButtonClick = useCallback(() => {
    setOpenModal("ratingModal", {
      movieId,
      myReview,
    });
  }, [setOpenModal, movieId, myReview]);

  return (
    <div className={`${styles.info} ${isNominated ? styles.nominated : ""}`}>
      <div className={styles["movie-img-wrapper"]}>
        <img
          src={`https://image.tmdb.org/t/p/w780${images[0].backdrop_path}`}
          alt="MovieImg"
        />
      </div>
      <div className={styles["info-content"]}>
        <h1 className={`header-h1 ${isNominated ? styles.nominated : ""}`}>
          {title}
        </h1>
        <p className="text-md text-regular">
          {releaseDate.substring(0, 4)} | {runningTimeStr} |{" "}
          {genres.map((genre) => genre.name).join(", ")}
        </p>
        <p className="text-md text-regular">{overview}</p>
        <div className={styles["chart-box"]}>
          <div className={styles["chart-container"]}>
            <div
              className={styles["chart-wrapper"]}
              onClick={handleRatingButtonClick}
            >
              <ScoreChart size="big" data={chartData} />
            </div>
            <div className={`${styles["score-text"]} text-bold text-md`}>
              <div className={styles["avg-score"]}>
                평균 총점 {score.totalAverageSkill}
              </div>
              {myScore && (
                <div className={styles["my-score"]}>
                  나의 총점 {myScore.myAvgSkill}
                </div>
              )}
            </div>
          </div>
          {isNominated && awardsAllScoreDto && (
            <div className={styles["chart-container"]}>
              <div
                className={`${styles["chart-wrapper"]} ${styles.nominated}`}
                onClick={handleRatingButtonClick}
              >
                <ScoreChart size="big" data={awardsChartData} />
              </div>
              <div className={`${styles["score-text"]} text-bold text-md`}>
                <div className={styles["avg-score"]}>
                  어워즈 평균 총점{" "}
                  {awardsAllScoreDto.awardsScore.totalAverageSkillWithAwards}
                </div>
                {awardsAllScoreDto.awardsMyScore.avgSkillWithMyAwards && (
                  <div className={styles["my-score"]}>
                    나의 총점{" "}
                    {awardsAllScoreDto.awardsMyScore.avgSkillWithMyAwards}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
