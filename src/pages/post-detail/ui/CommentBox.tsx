import PostMeta from "@/widgets/post-meta/ui/PostMeta";
import styles from "./CommentBox.module.css";
import MainButton from "@/widgets/main-button/ui/MainButton";

interface CommentBoxProps {
  commentId: number;
  postId: number;
  content: string;
  memberId: number;
  author: string;
  createdAt: string;
  updatedAt?: string;
  authorProfileImage: string;
}

export default function CommentBox({
  commentId,
  postId,
  content,
  memberId,
  author,
  createdAt,
  updatedAt,
  authorProfileImage,
}: CommentBoxProps) {
  const myComment = true;
  return (
    <li>
      <div className={styles["comment"]}>
        <div className={styles.header}>
          <PostMeta
            authorProfileImage={authorProfileImage}
            author={author}
            createdAt={createdAt}
            isUpdated={!!updatedAt}
          />
          {myComment && (
            <div className={`${styles.actions}`}>
              <MainButton color="sub" onClick={() => {}} fontSize="xs">
                수정
              </MainButton>
              <MainButton color="sub" onClick={() => {}} fontSize="xs">
                삭제
              </MainButton>
            </div>
          )}
        </div>

        <p className={`text-regular text-sm ${styles.content}`}>{content}</p>
      </div>
    </li>
  );
}