import { ReactNode, useState } from "react";
import styles from "./MainSwiper.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieCardDto } from "@/entities/movie/model/types";
import MovieCard from "@/entities/movie";
// @ts-ignore
import "swiper/css";
import "./MainSwiper.css";

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

interface MainSwiperProps {
  label: ReactNode;
}

export default function MainSwiper({ label }: MainSwiperProps) {
  const [topRated, _] = useState(
    Array.from({ length: 10 }, (_, i) => ({ ...movieCard, movieId: i }))
  );

  return (
    <div className={styles.container}>
      <h3 className={`header-h3`}>{label}</h3>
      <Swiper spaceBetween={16} slidesPerView="auto">
        {topRated?.map((movie, i) => (
          <SwiperSlide key={i}>
            <MovieCard movieCard={movie} onClick={() => {}} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
