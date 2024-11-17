import ScoreChart from "@/widgets/score-chart";
import styles from "./MovieInfo.module.css";

export default function MovieInfo() {
  return (
    <div className={styles.info}>
      <div className={styles["movie-img-wrapper"]}>
        <img
          src="https://static1.srcdn.com/wordpress/wp-content/uploads/2021/07/The-cast-of-The-Hateful-Eight-in-the-snow.jpg"
          alt="MovieImg"
        />
      </div>
      <div className={styles["info-content"]}>
        <h1 className="header-h1">헤이트풀8</h1>
        <p className="text-md text-regular">2024 | 2시간 8분 | 액션</p>
        <p className="text-md text-regular">
          이제 와 뒤늦게 무엇을 더 보태려 하나? 귀 기울여 듣지 않고 달리 보면
          그만인 것을 못 그린 내 빈 곳 무엇으로 채워지려나? 차라리 내 마음에
          비친 내 모습 그려가리 이제 와 뒤늦게 무엇을 더 보태려 하나? 귀 기울여
          듣지 않고 달리 보면 그만인 것을 못 그린 내 빈 곳 무엇으로 채워지려나
          이제 와 뒤늦게 무엇을 더 보태려 하나? 귀 기울여 듣지 않고 달리 보면
          그만인 것을 못 그린 내 빈 곳 무엇으로 채워지려나? 차라리 내 마음에
          비친 내 모습 그려가리 이제 와 뒤늦게 무엇을 더 보태려 하나? 귀 기울여
          듣지 않고 달리 보면 그만인 것을 못 그린 내 빈 곳 무엇으로 채워지려나
        </p>
        <div className={`${styles["score-text"]} text-bold text-lg`}>
          <span className={styles["avg-score"]}>평균 총점 4.8</span>
          <span className={styles["my-score"]}>
            나의 총점{" "}
            <button className={`${styles["score-button"]}`}>평가하기</button>
          </span>
        </div>
        <div className={styles["chart-wrapper"]}>
          <ScoreChart
            size="small"
            data={[
              {
                movieTitle: "",
                actorSkill: 7,
                lineSkill: 6,
                directorSkill: 6,
                musicSkill: 6,
                sceneSkill: 6,
                storySkill: 6,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
