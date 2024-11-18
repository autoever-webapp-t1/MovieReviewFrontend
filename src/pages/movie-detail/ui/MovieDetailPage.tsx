import { useParams } from "react-router-dom";
import styles from "./MovieDetailPage.module.css";
import MovieInfo from "./MovieInfo";
import MovieContent from "./MovieContent";
import { ReviewDetailDto, useMovie, useReview } from "@/entities/movie";
import { useMemo } from "react";

export default function MovieDetailPage() {
  const { movieId } = useParams();

  const { data: movieData } = useMovie(Number.parseInt(movieId!));

  const { data: pagedReviews } = useReview(parseInt(movieId!));
  console.log(pagedReviews);

  const reviews: ReviewDetailDto[] = useMemo(() => {
    return pagedReviews
      ? pagedReviews.pages
          .flatMap((page) => page.dtoList)
          .filter((review) => review.content !== null)
      : [];
  }, [pagedReviews]);
  console.log(reviews);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {movieData ? (
          <>
            <MovieInfo
              movieId={movieData.movieId}
              title={movieData.title}
              images={JSON.parse(movieData.images)}
              genres={JSON.parse(movieData.genres)}
              releaseDate={movieData.release_date}
              runningTime={movieData.runtime}
              overview={movieData.overview}
              score={movieData.score}
              myScore={movieData.myScore}
            />
            <MovieContent credits={movieData.credits} reviews={reviews} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
