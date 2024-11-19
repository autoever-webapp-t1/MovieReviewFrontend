import { useParams } from "react-router-dom";
import styles from "./MovieDetailPage.module.css";
import MovieInfo from "./MovieInfo";
import MovieContent from "./MovieContent";
import {
  ReviewDetailDto,
  useMovie,
  useRelated,
  useReview,
} from "@/entities/movie";
import { useMemo } from "react";

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const nominated1Id = sessionStorage.getItem("nominated1Id");
  const nominated2Id = sessionStorage.getItem("nominated2Id");
  const nominated3Id = sessionStorage.getItem("nominated3Id");
  const nominated4Id = sessionStorage.getItem("nominated4Id");

  const isNominated: boolean = useMemo(() => {
    if (
      movieId &&
      nominated1Id &&
      nominated2Id &&
      nominated3Id &&
      nominated4Id
    ) {
      return (
        movieId === nominated1Id ||
        movieId === nominated2Id ||
        movieId === nominated3Id ||
        movieId === nominated4Id
      );
    } else return false;
  }, [movieId, nominated1Id, nominated2Id, nominated3Id, nominated4Id]);

  const { data: movieWithReview } = useMovie(Number.parseInt(movieId!));
  const movieData = movieWithReview?.movieDetails;
  const myReview =
    movieWithReview?.reviews.length === 1 ? movieWithReview.reviews[0] : null;

  const { data: pagedReviews, hasNextPage } = useReview(parseInt(movieId!));

  const { data: relatedMovies } = useRelated(parseInt(movieId!));

  const reviews: ReviewDetailDto[] = useMemo(() => {
    return pagedReviews
      ? pagedReviews.pages.flatMap((page) => page.dtoList)
      : [];
  }, [pagedReviews]);

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
              credits={movieData.credits}
              videos={JSON.parse(movieData.videos)}
              reviews={reviews}
              myReview={myReview}
              hasNextPage={hasNextPage}
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
