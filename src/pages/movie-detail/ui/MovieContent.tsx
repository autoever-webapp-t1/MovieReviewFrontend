import { useCallback, useState } from "react";
import styles from "./MovieContent.module.css";
import ContentInfo from "./ContentInfo";
import { CreditDto, ReviewDetailDto, VideoDto } from "@/entities/movie";

interface MovieContentProps {
  credits: CreditDto[];
  videos: VideoDto[];
  reviews: ReviewDetailDto[];
  myReview: ReviewDetailDto | undefined;
}

export default function MovieContent({
  credits,
  videos,
  reviews,
  myReview,
}: MovieContentProps) {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabClick = useCallback((idx: number) => {
    setCurrentTab(idx);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["tab-header"]}>
        <button
          className={`text-bold text-md ${
            currentTab === 0 ? styles["selected-tab"] : ""
          }`}
          onClick={() => handleTabClick(0)}
        >
          콘텐츠 정보
        </button>
        <button
          className={`text-bold text-md ${
            currentTab === 1 ? styles["selected-tab"] : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          관련 콘텐츠
        </button>
      </div>
      {currentTab === 0 ? (
        <ContentInfo
          credits={credits}
          videos={videos}
          reviews={reviews}
          myReview={myReview}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
