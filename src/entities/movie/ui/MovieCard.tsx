import { MovieCardDto } from "../model/types";
import styles from "./MovieCard.module.css";
import AddLibraryImg from "@assets/add_library.svg";

interface MovieCardProps {
  movieCard: MovieCardDto;
}

export default function MovieCard({ movieCard }: MovieCardProps) {
  const { title, score, release_date, poster_path } = movieCard;
  return (
    <div className={styles.container}>
      <div className={styles["background-img-wrapper"]}>
        <img src={poster_path} alt="PosterImg" />
      </div>
      <div className={styles["info-box"]}>
        <h3 className="text-md text-bold">{title}</h3>
        <p className="text-xs text-regular">
          총점 {score.totalAverageSkill}/10
        </p>
        <p className="text-xs text-regular">{release_date}</p>
        <div className={styles["icon-wrapper"]}>
          <img src={AddLibraryImg} alt="AddLibraryImg" />
        </div>
      </div>
    </div>
  );
}
