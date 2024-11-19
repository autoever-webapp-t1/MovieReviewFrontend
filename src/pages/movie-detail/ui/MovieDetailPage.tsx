import { useParams } from "react-router-dom";
import styles from "./MovieDetailPage.module.css";
import MovieInfo from "./MovieInfo";
import MovieContent from "./MovieContent";
import { useMovie, useRelated } from "@/entities/movie";
import { useMemo } from "react";

export default function MovieDetailPage() {
  const { movieId } = useParams();

  const { data: movieWithReview } = useMovie(Number.parseInt(movieId!));
  const movieData = movieWithReview?.movieDetails;

  const isNominated = useMemo(() => {
    if (movieData) {
      return Boolean(movieData.awardsAllScoreDto);
    } else return false;
  }, [movieData]);

  const myReview =
    movieWithReview?.reviews.length === 1 ? movieWithReview.reviews[0] : null;

  const { data: relatedMovies } = useRelated(parseInt(movieId!));

  return (
    <div className={`${styles.wrapper}`}>
      <div className={styles.container}>
        {movieData ? (
          <>
            <MovieInfo
              movieId={movieData.id}
              title={movieData.title}
              images={JSON.parse(movieData.images)}
              genres={JSON.parse(movieData.genres)}
              releaseDate={movieData.release_date}
              runningTime={movieData.runtime}
              overview={movieData.overview}
              score={movieData.score}
              myScore={movieData.myScore}
              myReview={myReview}
              isNominated={isNominated}
              awardsAllScoreDto={movieData.awardsAllScoreDto}
            />
            <MovieContent
              movieId={movieData.id}
              credits={movieData.credits}
              videos={JSON.parse(movieData.videos)}
              myReview={myReview}
              relatedMovies={relatedMovies}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
