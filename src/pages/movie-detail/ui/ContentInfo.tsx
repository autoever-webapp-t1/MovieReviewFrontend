import { CreditDto, ReviewDetailDto } from "@/entities/movie";
import styles from "./ContentInfo.module.css";
import ContentSegment from "./ContentSegment";
import CreditItem from "./CreditItem";
import ReviewItem from "./ReviewItem";

const credit: CreditDto = {
  name: "김철수",
  type: "감독",
  profilePath:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Michael_Fassbender_by_Gage_Skidmore_2015.jpg/250px-Michael_Fassbender_by_Gage_Skidmore_2015.jpg",
};

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

export default function ContentInfo() {
  const credits = Array.from({ length: 10 }, () => credit);
  const reviews = Array.from({ length: 10 }, () => review);

  return (
    <div>
      <ContentSegment label="감독/출연">
        <div className={styles["credit-container"]}>
          {credits.map((c, i) => (
            <CreditItem key={i} credit={c} />
          ))}
        </div>
      </ContentSegment>
      <ContentSegment label="리뷰">
        <div className={styles["review-container"]}>
          <div className={styles["my-review"]}>
            <ReviewItem review={review} />
          </div>
          <div className={styles["review-list"]}>
            {reviews.map((r, i) => (
              <ReviewItem key={i} review={r} />
            ))}
          </div>
        </div>
      </ContentSegment>
    </div>
  );
}
