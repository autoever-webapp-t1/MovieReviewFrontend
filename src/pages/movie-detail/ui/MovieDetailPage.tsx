import { useParams } from "react-router-dom";
import styles from "./MovieDetailPage.module.css";
import MovieInfo from "./MovieInfo";
import MovieContent from "./MovieContent";

export default function MovieDetailPage() {
  const { movieId } = useParams();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <MovieInfo />
        <MovieContent />
      </div>
    </div>
  );
}
