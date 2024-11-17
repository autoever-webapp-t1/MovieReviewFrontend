import styles from "./AwardsPage.module.css";
import NominatedCard from "./NominatedCard";
import { Score } from "@/entities/movie";

const score: Score = {
  avgActorSkill: 7,
  avgDirectorSkill: 6,
  avgLineSkill: 5,
  avgMusicSkill: 6.5,
  avgSceneSkill: 6.6,
  avgStorySkill: 9,
  totalAverageSkill: 1,
};

export default function AwardsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1 className={`header-h1`}>제 14회 고전 명작 어워즈</h1>
      </div>
      <div className={styles["nominated-list"]}>
        <NominatedCard idx={0} score={score} />
        <NominatedCard idx={1} score={score} />
        <NominatedCard idx={2} score={score} />
        <NominatedCard idx={3} score={score} />
      </div>
    </div>
  );
}
