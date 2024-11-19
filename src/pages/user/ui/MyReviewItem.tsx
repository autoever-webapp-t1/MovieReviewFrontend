import { useMemo } from "react";
import { MyReviewDetailDto } from "../model/types";
import styles from "./MyReviewItem.module.css";
import ScoreChart from "@/widgets/score-chart";
import { ChartRawData } from "@/widgets/score-chart/model/types";
import { useNavigate } from "react-router-dom";

interface MyReviewItemProps {
  review: MyReviewDetailDto;
}

export default function MyReviewItem({ review }: MyReviewItemProps) {
  const { title, createdDate, poster_path, content, movieId } = review;

  const navigate = useNavigate();

  const date: string = useMemo(() => {
    const d = new Date(Date.parse(createdDate));

    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }, [createdDate]);

  const chartData: ChartRawData = useMemo(() => {
    return {
      movieTitle: title,
      actorSkill: review.actorSkill,
      directorSkill: review.directorSkill,
      sceneSkill: review.sceneSkill,
      lineSkill: review.lineSkill,
      musicSkill: review.musicSkill,
      storySkill: review.storySkill,
    };
  }, [review]);

  return (
    <div className={styles.container}>
      <div
        className={styles["poster-wrapper"]}
        onClick={() => {
          navigate(`/movie/${movieId}`);
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
          alt="PosterImg"
        />
      </div>
      <div className={styles.content}>
        <h3 className="text-bold text-md">{title}</h3>
        <p className={`${styles.date} text-regular text-sm`}>{date}</p>
        <p
          className={`${
            content === null ? styles["no-text"] : styles.text
          } text-regular text-md`}
        >
          {content || "작성된 내용이 없습니다"}
        </p>
      </div>
      <div className={styles["chart-wrapper"]}>
        <ScoreChart size="small" data={[chartData]} />
      </div>
    </div>
  );
}
