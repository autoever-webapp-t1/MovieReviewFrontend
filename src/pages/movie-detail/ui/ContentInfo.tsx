import { CreditDto, ReviewDetailDto, VideoDto } from "@/entities/movie";
import styles from "./ContentInfo.module.css";
import ContentSegment from "./ContentSegment";
import CreditItem from "./CreditItem";
import ReviewItem from "./ReviewItem";
import VideoItem from "./VideoItem";

const review: ReviewDetailDto = {
  reviewId: 1,
  movieId: 155,
  memberId: 3758970850,
  title: "다크 나이트",
  nickname: "혜지",
  profile:
    "http://k.kakaocdn.net/dn/lWMYq/btsJcJApD2r/6ybIUL3Ge2bk14rm4kURDk/img_640x640.jpg",
  content: "happy ending movie",
  createdDate: "2024-11-14T12:22:25.494286",
  modifyDate: "2024-11-14T12:22:25.494286",
  totalHeart: 0,
  myHeart: false,
  actorSkill: 3,
  directorSkill: 8,
  sceneSkill: 6,
  musicSkill: 1,
  storySkill: 9,
  lineSkill: 4,
  avgSkill: 2.58,
};

interface ContentInfoProps {
  credits: CreditDto[];
  videos: VideoDto[];
  reviews: ReviewDetailDto[];
}

export default function ContentInfo({
  credits,
  videos,
  reviews,
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
            <ReviewItem review={review} />
          </div>
          <div className={styles["review-list"]}>
            {reviews.length > 0 ? (
              reviews.map((r, i) => <ReviewItem key={i} review={r} />)
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
