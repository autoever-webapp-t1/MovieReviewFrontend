import { MovieDetailDto } from "@/entities/movie";
import styles from "./NominatedCard.module.css";
import ScoreChart from "@/widgets/score-chart";
import { useMemo } from "react";

interface NominatedCardProps {
  movie: MovieDetailDto;
  idx: number;
}

export default function NominatedCard({ movie, idx }: NominatedCardProps) {
  const { score, images } = movie;
  const posterPath: string = useMemo(() => {
    return JSON.parse(images)[0].poster_path;
  }, []);

  return (
    <div className={`${styles.container} ${styles[`idx-${idx}`]}`}>
      <img
        src={`https://image.tmdb.org/t/p/w200${posterPath}`}
        alt="NominatedImg"
      />

      <div className={styles.info}>
        {/* <div className={`${styles.description} text-bold text-md`}>내 점수</div> */}
        <div className={styles["chart-wrapper"]}>
          <ScoreChart
            size="big"
            data={[
              {
                movieTitle: "",
                actorSkill: score.avgActorSkill,
                directorSkill: score.avgDirectorSkill,
                storySkill: score.avgStorySkill,
                musicSkill: score.avgMusicSkill,
                sceneSkill: score.avgSceneSkill,
                lineSkill: score.avgLineSkill,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
