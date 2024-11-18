import { useParams } from "react-router-dom";
import styles from "./MovieDetailPage.module.css";
import MovieInfo from "./MovieInfo";
import MovieContent from "./MovieContent";
import { ReviewDetailDto, useMovie, useReview } from "@/entities/movie";
import { useMemo } from "react";

export default function MovieDetailPage() {
  const { movieId } = useParams();

  const { data: movieWithReview } = useMovie(Number.parseInt(movieId!));
  const movieData = movieWithReview?.movieDetails;
  const myReview =
    movieWithReview?.reviews.length === 1 ? movieWithReview.reviews[0] : null;

  const { data: pagedReviews, hasNextPage } = useReview(parseInt(movieId!));

  const reviews: ReviewDetailDto[] = useMemo(() => {
    return pagedReviews
      ? pagedReviews.pages
          .flatMap((page) => page.dtoList)
          .filter((review) => review.content !== null)
      : [];
  }, [pagedReviews]);

  return (
    <div className={styles.wrapper}>
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
            />
            <MovieContent
              credits={movieData.credits}
              videos={JSON.parse(movieData.videos)}
              reviews={reviews}
              myReview={myReview}
              hasNextPage={hasNextPage}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
