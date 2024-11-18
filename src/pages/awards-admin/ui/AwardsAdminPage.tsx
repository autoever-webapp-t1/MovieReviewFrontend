import NominatedCard from "@/pages/awards/ui/NominatedCard";
import styles from "./AwardsAdminPage.module.css";
import { useState } from "react";
import AwardAddForm from "./AwardAddForm";
import { Score } from "@/entities/movie";

const score: Score = {
  avgActorSkill: 0,
  avgDirectorSkill: 0,
  avgLineSkill: 0,
  avgMusicSkill: 0,
  avgSceneSkill: 0,
  avgStorySkill: 0,
  totalAverageSkill: 0,
};

export default function AwardsAdminPage() {
  return (
    <div className={styles.container}>
      <div>
        <h1 className="header-h1">어워드 관리 페이지</h1>
      </div>
      <div className={styles["nominated-list"]}>
        {/* 노미네이트된 카드들 */}
        {/* <NominatedCard idx={0} score={score} />
        <NominatedCard idx={1} score={score} />
        <NominatedCard idx={2} score={score} />
        <NominatedCard idx={3} score={score} /> */}
      </div>
      <AwardAddForm />
    </div>
  );
}
