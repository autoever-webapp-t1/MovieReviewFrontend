import { useParams } from "react-router-dom";
import styles from "./MovieDetailPage.module.css";
import MovieInfo from "./MovieInfo";
import MovieContent from "./MovieContent";
import { useMovie, useReview } from "@/entities/movie";
import { useUserStore } from "@/entities/user";

export default function MovieDetailPage() {
  const { user } = useUserStore();
  const { movieId } = useParams();

  const { data: movieData } = useMovie(
    Number.parseInt(movieId!),
    user!.memberId
  );
  console.log(movieData);

  const { data: reviews } = useReview(parseInt(movieId!));

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {movieData ? (
          <>
            <MovieInfo
              title={movieData.title}
              images={JSON.parse(movieData.images)}
              genres={JSON.parse(movieData.genres)}
              releaseDate={movieData.release_date}
              runningTime={movieData.runtime}
              overview={movieData.overview}
              score={movieData.score}
              myScore={movieData.myScore}
            />
            <MovieContent credits={movieData.credits} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
