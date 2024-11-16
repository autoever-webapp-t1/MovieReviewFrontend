import { Favorite, FavoriteBorder } from "@mui/icons-material";
import styles from "./PostDetailPage.module.css";
import PostMeta from "@/widgets/post-meta/ui/PostMeta";
import MainButton from "@/widgets/main-button/ui/MainButton";
import { useState } from "react";

export default function PostDetailPage() {
  const authorProfileImage = "../../../src/assets/jackeylove.jpg";
  const author = "재키러브";
  const createdAt = "2024-11-05 08:15:00";
  const likeCount = 26;
  const isAuthor = false;

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
            사람이 언제 죽는다고 생각하나···? 심장이 총알에 뚫렸을 때···?
            ···아니. 불치의 병에 걸렸을 때? ···아니. 맹독 버섯 스프를 마셨을
            때···? 아니야!!! ···사람들에게서 잊혀졌을 때다···!!!
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
        <div className={styles["body-content"]}>body-content</div>
        <div className={styles["review"]}>review</div>
      </div>
    </div>
  );
}
