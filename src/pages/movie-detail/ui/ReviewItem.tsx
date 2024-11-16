import { ReviewDetailDto } from "@/entities/movie";
import styles from "./ReviewItem.module.css";
import ProfileImage from "@/widgets/profile-image";
import ScoreChart from "@/widgets/score-chart";
import { useMemo } from "react";
import CustomRating from "@/widgets/CustomRating";

interface ReviewItemProps {
  review: ReviewDetailDto;
}

export default function ReviewItem({ review }: ReviewItemProps) {
  const {
    profile,
    nickname,
    content,
    actorSkill,
    sceneSkill,
    lineSkill,
    directorSkill,
    storySkill,
    musicSkill,
  } = review;

  const totalSkill = useMemo(() => {
    return (
      Math.floor(
        ((actorSkill +
          sceneSkill +
          lineSkill +
          directorSkill +
          storySkill +
          musicSkill) *
          10) /
          6
      ) / 20
    );
  }, [
    actorSkill,
    sceneSkill,
    lineSkill,
    directorSkill,
    storySkill,
    musicSkill,
  ]);

  console.log(totalSkill);

  return (
    <div className={styles.container}>
      <div className={styles["profile-img-wrapper"]}>
        <ProfileImage src={profile} alt="ProfileImg" size={32} />
      </div>
      <div className={`${styles.content} text-light text-md`}>
        <div className={styles.header}>
          <div className={`${styles.username} text-bold text-md`}>
            {nickname}
          </div>
          <div className={styles.rating}>
            <CustomRating size="small" value={totalSkill} />
          </div>
        </div>
        {content}
      </div>
      <div className={styles["chart-wrapper"]}>
        <ScoreChart
          size="small"
          data={[
            {
              movieTitle: "",
              actorSkill,
              sceneSkill,
              lineSkill,
              directorSkill,
              storySkill,
              musicSkill,
            },
          ]}
        />
      </div>
    </div>
  );
}
