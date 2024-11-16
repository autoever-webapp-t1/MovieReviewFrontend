import { Favorite, FavoriteBorder } from "@mui/icons-material";
import styles from "./PostDetailPage.module.css";
import PostMeta from "@/widgets/post-meta/ui/PostMeta";
import TextButton from "@/widgets/text-button/ui/TextButton";

export default function PostDetailPage() {
  const authorProfileImage = "../../../src/assets/jackeylove.jpg";
  const author = "재키러브";
  const createdAt = "2024-11-05 08:15:00";
  const likeCount = 26;
  return (
    <div className={styles["vertical-center-alignment"]}>
      <div className={`${styles["container"]} ${styles["post-header"]}`}>
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
          <Favorite sx={{ color: "var(--color-sub-light)", fontSize: 36 }} />
          <FavoriteBorder
            sx={{ color: "var(--color-sub-light)", fontSize: 36 }}
          />
        </div>
      </div>
      <div className={styles["divide-line"]} />
      <div className={styles["post-body"]}></div>
    </div>
  );
}
