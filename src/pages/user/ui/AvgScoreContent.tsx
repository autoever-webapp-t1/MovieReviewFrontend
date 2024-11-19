import { useEffect, useMemo, useState } from "react";
import styles from "./AvgScoreContent.module.css";
import { fetchMyRatingScore } from "@/entities/user";
import MovieCard, { Score, useMyMovie } from "@/entities/movie";
import ScoreChart from "@/widgets/score-chart";
import { ChartRawData } from "@/widgets/score-chart/model/types";
import Spinner from "@/widgets/spinner";

export default function AvgScoreContent() {
  const [avgScore, setAvgScore] = useState<Score>();
  const chartData: ChartRawData | undefined = useMemo(() => {
    return avgScore
      ? {
          movieTitle: "",
          actorSkill: avgScore.avgActorSkill,
          directorSkill: avgScore.avgDirectorSkill,
          lineSkill: avgScore.avgLineSkill,
          musicSkill: avgScore.avgMusicSkill,
          sceneSkill: avgScore.avgSceneSkill,
          storySkill: avgScore.avgStorySkill,
        }
      : undefined;
  }, [avgScore]);

  const getAvgScore = async () => {
    const score = await fetchMyRatingScore();

    score.totalAverageSkill = parseFloat(
      (
        (score.avgActorSkill +
          score.avgDirectorSkill +
          score.avgLineSkill +
          score.avgMusicSkill +
          score.avgSceneSkill +
          score.avgStorySkill) /
        12
      ).toFixed(2)
    );

    setAvgScore(score);
  };

  useEffect(() => {
    getAvgScore();
  }, []);

  const { data: myMovie } = useMyMovie();

  return (
    <div className={styles.container}>
      <div className={styles["chart-box"]}>
        {avgScore && chartData ? (
          <>
            <div className={styles["chart-wrapper"]}>
              <ScoreChart size="big" data={[chartData]} />
            </div>
            <div className={styles["score-list"]}>
              <h3 className="text-bold text-lg">
                총점 {avgScore.totalAverageSkill}/5
              </h3>
              <p className="text-regular text-lg">
                영상미 {(avgScore.avgSceneSkill / 2).toFixed(2)}/5
              </p>
              <p className="text-regular text-lg">
                연기력 {(avgScore.avgActorSkill / 2).toFixed(2)}/5
              </p>
              <p className="text-regular text-lg">
                대사 {(avgScore.avgLineSkill / 2).toFixed(2)}/5
              </p>
              <p className="text-regular text-lg">
                연출 {(avgScore.avgDirectorSkill / 2).toFixed(2)}/5
              </p>
              <p className="text-regular text-lg">
                음악 {(avgScore.avgMusicSkill / 2).toFixed(2)}/5
              </p>
              <p className="text-regular text-lg">
                스토리 {(avgScore.avgStorySkill / 2).toFixed(2)}/5
              </p>
            </div>
          </>
        ) : (
          <div className={styles["spinner-wrapper"]}>
            <Spinner />
          </div>
        )}
      </div>
      <div className={styles["my-movie-box"]}>
        <div className={`${styles.header} header-h2`}>본 영화</div>
        {myMovie ? (
          <div className={styles["my-movie-list"]}>
            {myMovie.map((movie, i) => (
              <MovieCard key={i} movieCard={movie} onClick={() => {}} />
            ))}
          </div>
        ) : (
          <div className={styles["spinner-wrapper"]}>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
