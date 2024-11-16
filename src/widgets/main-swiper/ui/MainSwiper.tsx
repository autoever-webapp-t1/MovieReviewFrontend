import { ReactNode } from "react";
import styles from "./MainSwiper.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieCardDto } from "@/entities/movie/model/types";
import MovieCard from "@/entities/movie";
// @ts-ignore
import "swiper/css";
import "./MainSwiper.css";
import Spinner from "@/widgets/spinner";

interface MainSwiperProps {
  label: ReactNode;
  data: MovieCardDto[] | undefined;
}

export default function MainSwiper({ label, data }: MainSwiperProps) {
  return (
    <div className={styles.container}>
      <h3 className={`header-h3`}>{label}</h3>
      {data ? (
        <Swiper spaceBetween={16} slidesPerView="auto">
          {data?.map((movie, i) => (
            <SwiperSlide key={i}>
              <MovieCard movieCard={movie} onClick={() => {}} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles["spinner-wrapper"]}>
          <Spinner />
        </div>
      )}
    </div>
  );
}
