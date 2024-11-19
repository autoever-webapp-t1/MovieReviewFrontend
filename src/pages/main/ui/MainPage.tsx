import MainButton from "@/widgets/main-button/ui/MainButton";
import styles from "./MainPage.module.css";
import VisualImg from "@assets/visual.png";
import TextButton from "@/widgets/text-button/ui/TextButton";
import { useCallback } from "react";
import MainSwiper from "@/widgets/main-swiper";
import {
  useNowPlaing,
  usePopular,
  useTopRated,
  useUpComing,
} from "@/entities/movie";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  const { data: nowPlaying } = useNowPlaing();
  const { data: topRated } = useTopRated();
  const { data: upComing } = useUpComing();
  const { data: popular } = usePopular();

  const handleAwardsButtonClick = useCallback(() => {
    navigate("/awards");
  }, []);

  const handleHistoryButtonClick = useCallback(() => {
    navigate("/awards/history");
  }, []);

  return (
    <div>
      <div className={styles.visual}>
        <div className={styles["visual-img-wrapper"]}>
          <img src={VisualImg} alt="VisualImg" />
        </div>
        <div className={styles["visual-content"]}>
          <div className={styles.info}>
            <h1 className="header-h1">제 13회 고전 공포 어워즈</h1>
            <p className="header-h2">후보작들이 발표되었습니다</p>
            <p className="header-h2">지금 바로 후보들을 확인해보세요</p>
          </div>
          <div className={styles["button-box"]}>
            <MainButton color="primary" onClick={handleAwardsButtonClick}>
              지금 확인하러가기
            </MainButton>
            <TextButton color="primary" onClick={handleHistoryButtonClick}>
              이전 수상작 확인하기
            </TextButton>
          </div>
        </div>
      </div>
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <MainSwiper label={<>현재 상영 중</>} data={nowPlaying} />
          <MainSwiper label={<>평점이 높은</>} data={topRated} />
          <MainSwiper label={<>개봉 예정</>} data={upComing} />
          <MainSwiper label={<>인기 있는</>} data={popular} />
        </div>
      </div>
    </div>
  );
}
