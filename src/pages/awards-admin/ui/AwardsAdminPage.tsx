import styles from "./AwardsAdminPage.module.css";
import AwardAddForm from "./AwardAddForm";

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
