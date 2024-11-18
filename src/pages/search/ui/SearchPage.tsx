import MovieCard, { useInfiniteSearchMovies } from "@/entities/movie";
import { useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./SearchPage.module.css";
import Spinner from "@/widgets/spinner";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const size = 10;
  const navigate = useNavigate();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteSearchMovies(query || "", size);
  const movies = data?.pages.flatMap((page) => page.dtoList);

  const handleMovieCardClick = useCallback((movieId: number) => {
    navigate(`/movie/${movieId}`);
  }, []);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetchingNextPage) return; // 추가 데이터 로드 중이면 아무 작업도 하지 않음

      if (observerRef.current) observerRef.current.disconnect(); // 기존 관찰자 해제

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage(); // 다음 페이지 데이터 로드
        }
      });

      if (node) observerRef.current.observe(node); // 마지막 아이템 관찰 시작
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

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
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            ref={index === movies.length - 1 ? lastItemRef : undefined}
          >
            <MovieCard
              movieCard={{
                ...movie,
                poster_path: JSON.parse(movie.poster_path)[0].poster_path,
              }}
              onClick={() => handleMovieCardClick(movie.id)}
            />
          </div>
        ))}
      </div>
      {isFetchingNextPage && (
        <div className={styles["spinner-wrapper"]}>
          <Spinner />
        </div>
      )}
    </div>
  );
}
