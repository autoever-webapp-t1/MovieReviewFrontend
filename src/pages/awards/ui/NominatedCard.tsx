import { Score } from "@/entities/movie";
import styles from "./NominatedCard.module.css";
import ScoreChart from "@/widgets/score-chart";

interface NominatedCardProps {
  idx: number;
  score: Score;
}

export default function NominatedCard({ idx, score }: NominatedCardProps) {
  return (
    <div className={`${styles.container} ${styles[`idx-${idx}`]}`}>
      <img
        src="https://i.namu.wiki/i/hwTmapI5x7fN8IuqFHO4HfoFeItPIRL5V2NBdqFtuc9CWJUGeKbMCNLCEq3u1ZIlINTrzA9xr81_aX_v7b8hng.webp"
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
