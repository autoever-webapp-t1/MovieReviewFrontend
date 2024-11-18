import { CreditDto, ReviewDetailDto, VideoDto } from "@/entities/movie";
import styles from "./ContentInfo.module.css";
import ContentSegment from "./ContentSegment";
import CreditItem from "./CreditItem";
import ReviewItem from "./ReviewItem";
import VideoItem from "./VideoItem";

interface ContentInfoProps {
  credits: CreditDto[];
  videos: VideoDto[];
  reviews: ReviewDetailDto[];
  myReview: ReviewDetailDto | null;
  hasNextPage: boolean;
}

export default function ContentInfo({
  credits,
  videos,
  reviews,
  myReview,
  hasNextPage,
}: ContentInfoProps) {
  return (
    <div>
      <ContentSegment label="감독/출연">
        <div className={styles["credit-container"]}>
          {credits.map((c, i) => (
            <CreditItem key={i} credit={c} />
          ))}
        </div>
      </ContentSegment>
      {videos.length > 0 ? (
        <ContentSegment label="동영상">
          <div className={styles["video-container"]}>
            {videos.map((v, i) => (
              <VideoItem key={i} src={v.key} />
            ))}
          </div>
        </ContentSegment>
      ) : (
        <></>
      )}
      <ContentSegment label="리뷰">
        <div className={styles["review-container"]}>
          <div className={styles["my-review"]}>
            {myReview === null ? (
              <div className={styles["please-rating"]}>
                평가를 먼저 남겨주세요
              </div>
            ) : (
              <ReviewItem review={myReview} isMine />
            )}
          </div>
          <div className={styles["review-list"]}>
            {reviews.length > 0 ? (
              <>
                {reviews.map((r, i) => (
                  <ReviewItem key={i} review={r} isMine={false} />
                ))}
                {hasNextPage && (
                  <button className={styles["more-button"]}>MORE</button>
                )}
              </>
            ) : (
              <div className={`${styles["no-review"]} text-bold text-lg`}>
                작성된 리뷰가 없습니다
              </div>
            )}
          </div>
        </div>
      </ContentSegment>
    </div>
  );
}
