import SplashBackground from "@/widgets/splash-background";
import LogoImg from "@assets/logo.svg";
import styles from "./SignupPage.module.css";
import TextButton from "@/widgets/text-button/ui/TextButton";
import MovieCard from "@/entities/movie";
import { MovieCardDto } from "@/entities/movie/model/types";
import { useCallback, useState } from "react";

const movieCard: MovieCardDto = {
  movieId: 1,
  title: "헤이트풀 8",
  overview: "가나다라마바사아 가나다라마바사아",
  poster_path:
    "https://m.media-amazon.com/images/M/MV5BMjA1MTc1NTg5NV5BMl5BanBnXkFtZTgwOTM2MDEzNzE@._V1_.jpg",
  score: {
    avgSceneSkill: 8.9,
    totalAverageSkill: 7.7,
    avgLineSkill: 7.1,
    avgStorySkill: 7.0,
    avgDirectorSkill: 6.6,
    avgMusicSkill: 9.0,
    avgActorSkill: 9.0,
  },
  release_date: "2024-11-15",
  genre_ids: [1, 2, 3],
};

export default function SignupPage() {
  const [topRated, setTopRated] = useState(
    Array.from({ length: 100 }, (v, i) => ({ ...movieCard, movieId: i }))
  );

  const [selectedMovieCards, setSelectedMovieCards] = useState<number[]>([]);

  const handleMovieCardClick = useCallback(
    (movieId: number) => {
      setSelectedMovieCards([...selectedMovieCards, movieId]);
    },
    [selectedMovieCards]
  );

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
              onClick={() => {}}
              disabled={selectedMovieCards.length < 3}
            >
              {selectedMovieCards.length < 3
                ? `${3 - selectedMovieCards.length} 남음`
                : "다음"}
            </TextButton>
          </div>
        </div>
        <div className={styles["movie-list"]}>
          {topRated.map((movie, i) => (
            <MovieCard
              key={i}
              movieCard={movie}
              selected={selectedMovieCards.includes(movie.movieId)}
              onClick={() => handleMovieCardClick(movie.movieId)}
            />
          ))}
        </div>
      </div>
    </SplashBackground>
  );
}
