import MainButton from "@/widgets/main-button/ui/MainButton";
import PostMeta from "@/widgets/post-meta/ui/PostMeta";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useState } from "react";
import styles from "./PostDetailPage.module.css";
import CommentBox from "./CommentBox";

export default function PostDetailPage() {
  const authorProfileImage = "../../../src/assets/jackeylove.jpg";
  const author = "재키러브";
  const createdAt = "2024-11-05 08:15:00";
  const likeCount = 26;
  const isAuthor = false;
  const commentCount = 4;

  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    console.log(isLiked ? "좋아요 취소" : "좋아요 누름");
  };
  return (
    <div className={styles["vertical-center-alignment"]}>
      <div className={`${styles.container} ${styles["post-header"]}`}>
        <div className={`${styles.title}`}>
          <span className="header-h2">
            효율적인 시간 관리 방법, 이렇게 해보세요
          </span>
          <PostMeta
            authorProfileImage={authorProfileImage}
            author={author}
            createdAt={createdAt}
            likeCount={likeCount}
          />
        </div>
        <div className={styles.actions}>
          {isAuthor ? (
            <>
              <MainButton color="primary" onClick={() => {}} disabled={false}>
                수정
              </MainButton>
              <MainButton color="primary" onClick={() => {}} disabled={false}>
                삭제
              </MainButton>
            </>
          ) : (
            <div className={styles.button}>
              {isLiked ? (
                <Favorite
                  sx={{ color: "var(--color-sub-light)", fontSize: 36 }}
                  onClick={toggleLike}
                />
              ) : (
                <FavoriteBorder
                  sx={{ color: "var(--color-sub-light)", fontSize: 36 }}
                  onClick={toggleLike}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className={styles["divide-line"]} />
      <div className={`${styles["post-body"]} ${styles.container}`}>
        <div className={styles["body-content"]} style={{ height: "500px" }}>
          body-content
        </div>
      </div>
      <div className={`${styles["comment-container"]} ${styles.container}`}>
        <div className={styles["comment-header"]}>
          댓글 <span className={styles["comment-count"]}>{commentCount}</span>
        </div>
        <div>
          <ul>
            <CommentBox
              commentId={1}
              postId={1}
              memberId={12}
              content="타노스의 의도는 공감할 수 있지만, 방식은 너무나 극단적이네요. 자원을 효율적으로 사용하거나 대안을 마련하는 것이 가능했을 텐데, 굳이 생명체를 없애는 방법만이 답은 아니었을 것 같아요."
              author="재키러브"
              createdAt="2024-11-12 12:36:00"
              authorProfileImage={authorProfileImage}
            />
            <CommentBox
              commentId={2}
              postId={1}
              memberId={12}
              content="타노스의 의도는 공감할 수 있지만, 방식은 너무나 극단적이네요. 자원을 효율적으로 사용하거나 대안을 마련하는 것이 가능했을 텐데, 굳이 생명체를 없애는 방법만이 답은 아니었을 것 같아요. 타노스의 의도는 공감할 수 있지만, 방식은 너무나 극단적이네요. 자원을 효율적으로 사용하거나 대안을 마련하는 것이 가능했을 텐데, 굳이 생명체를 없애는 방법만이 답은 아니었을 것 같아요. 타노스의 의도는 공감할 수 있지만, 방식은 너무나 극단적이네요. 자원을 효율적으로 사용하거나 대안을 마련하는 것이 가능했을 텐데, 굳이 생명체를 없애는 방법만이 답은 아니었을 것 같아요."
              author="재키러브"
              createdAt="2024-11-12 12:36:00"
              updatedAt="2024-11-12 14:36:00"
              authorProfileImage={authorProfileImage}
            />
            <CommentBox
              commentId={2}
              postId={1}
              memberId={12}
              content="타노스의 의도는 공감할 수 있지만, 방식은 너무나 극단적이네요. 자원을 효율적으로 사용하거나 대안을 마련하는 것이 가능했을 텐데, 굳이 생명체를 없애는 방법만이 답은 아니었을 것 같아요. 타노스의 의도는 공감할 수 있지만, 방식은 너무나 극단적이네요. 자원을 효율적으로 사용하거나 대안을 마련하는 것이 가능했을 텐데, 굳이 생명체를 없애는 방법만이 답은 아니었을 것 같아요. 타노스의 의도는 공감할 수 있지만, 방식은 너무나 극단적이네요. 자원을 효율적으로 사용하거나 대안을 마련하는 것이 가능했을 텐데, 굳이 생명체를 없애는 방법만이 답은 아니었을 것 같아요."
              author="재키러브"
              createdAt="2024-11-12 12:36:00"
              updatedAt="2024-11-12 14:36:00"
              authorProfileImage={authorProfileImage}
            />
          </ul>
        </div>
        <div>
          <textarea className={styles.input} maxLength={500}></textarea>
          <div className={styles.add}>
            <MainButton color="sub" onClick={() => {}} fontSize="xs">
              등록
            </MainButton>
          </div>
        </div>
      </div>
    </div>
  );
}
