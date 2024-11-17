import SplashBackground from "@/widgets/splash-background";
import LogoImg from "@assets/logo.svg";
import styles from "./SignupPage.module.css";
import TextButton from "@/widgets/text-button/ui/TextButton";
import MovieCard, { useTopRated } from "@/entities/movie";
import { useCallback, useMemo } from "react";
import { useModalStore } from "@/widgets/app-modal/model/store";
import Spinner from "@/widgets/spinner";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();

  const { setOpenModal } = useModalStore();

  const { data: topRated } = useTopRated();

  const selectedMovieCards = useMemo(() => {
    if (topRated) {
      return topRated
        .filter((movie) => movie.myScore !== null)
        .map((movie) => movie.id);
    } else return [];
  }, [topRated]);

  const handleMovieCardClick = useCallback(
    (movieId: number) => {
      setOpenModal("ratingModal", { movieId: movieId });
    },
    [selectedMovieCards]
  );

  const handleNextButtonClick = useCallback(() => {
    navigate("/main");
  }, []);

  return (
    <SplashBackground>
      <div className={styles["signup-box"]}>
        <div className={styles["logo-wrapper"]}>
          <img src={LogoImg} alt="LogoImg" />
        </div>
        <div className={`${styles.title} header-h2`}>
          좋아하는 영화를 골라주세요
          <div className={styles["button-wrapper"]}>
            <TextButton
              color="primary"
              onClick={handleNextButtonClick}
              disabled={selectedMovieCards.length < 3}
            >
              {selectedMovieCards.length < 3
                ? `${3 - selectedMovieCards.length} 남음`
                : "다음"}
            </TextButton>
          </div>
        </div>
        {topRated ? (
          <div className={styles["movie-list"]}>
            {topRated?.map((movie, i) => (
              <MovieCard
                key={i}
                movieCard={movie}
                selected={selectedMovieCards.includes(movie.id)}
                onClick={() => handleMovieCardClick(movie.id)}
                type="check"
              />
            ))}
          </div>
        ) : (
          <div className={styles["spinner-wrapper"]}>
            <Spinner />
          </div>
        )}
      </div>
    </SplashBackground>
  );
}
