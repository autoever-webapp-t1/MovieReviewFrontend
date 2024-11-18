import MovieCard, { useSearchMovie } from "@/entities/movie";
import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./SearchPage.module.css";
import Spinner from "@/widgets/spinner";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const navigate = useNavigate();
  const { data: data, isLoading } = useSearchMovie(query || "");
  const movies = data?.dtoList;

  const handleMovieCardClick = useCallback((movieId: number) => {
    navigate(`/movie/${movieId}`);
  }, []);

  if (isLoading)
    return (
      <div className={styles["spinner-wrapper"]}>
        <Spinner />
      </div>
    );

  if (!query) {
    return (
      <div className={`${styles.notification} header-h2`}>
        <p>검색어를 입력해 주세요.</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className={`${styles.notification} header-h2`}>
        <p>검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.result}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movieCard={{
              ...movie,
              poster_path: JSON.parse(movie.poster_path)[0].poster_path,
            }}
            onClick={() => handleMovieCardClick(movie.id)}
          />
        ))}
      </div>
    </div>
  );
}
