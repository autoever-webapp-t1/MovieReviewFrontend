import PostMeta from "@/widgets/post-meta/ui/PostMeta";
import styles from "./CommentBox.module.css";
import MainButton from "@/widgets/main-button/ui/MainButton";
import { useState } from "react";
import { formatDate } from "@/shared/lib/dateUtils";

interface CommentBoxProps {
  commentId: number;
  postId: number;
  content: string;
  memberId: number;
  author: string;
  createdAt: string;
  updatedAt: string;
  authorProfileImage: string;
  handleEditComment: (commentId: number, editedContent: string) => void;
  handleRemoveComment: (commentId: number) => void;
}

export default function CommentBox({
  content,
  author,
  createdAt,
  memberId,
  commentId,
  // postId,
  updatedAt,
  authorProfileImage,
  handleEditComment,
  handleRemoveComment,
}: CommentBoxProps) {
  const userId = sessionStorage.getItem("userId") ?? "";
  const myComment = memberId === Number(userId);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleSaveEdit = () => {
    handleEditComment(commentId, editedContent); // 수정 저장
    setIsEditing(false); // 수정 모드 종료
  };

  return (
    <li>
      <div className={styles["comment"]}>
        <div className={styles.header}>
          <PostMeta
            authorProfileImage={authorProfileImage}
            author={author}
            createdAt={createdAt}
            isUpdated={createdAt !== updatedAt}
          />
          {myComment && (
            <div className={`${styles.actions}`}>
              {isEditing ? (
                <>
                  <MainButton
                    color="sub"
                    onClick={handleSaveEdit}
                    fontSize="xs"
                  >
                    저장
                  </MainButton>
                  <MainButton
                    color="sub"
                    onClick={() => setIsEditing(false)}
                    fontSize="xs"
                  >
                    취소
                  </MainButton>
                </>
              ) : (
                <>
                  <MainButton
                    color="sub"
                    onClick={() => setIsEditing(true)}
                    fontSize="xs"
                  >
                    수정
                  </MainButton>
                  <MainButton
                    color="sub"
                    onClick={() => handleRemoveComment(commentId)}
                    fontSize="xs"
                  >
                    삭제
                  </MainButton>
                </>
              )}
            </div>
          )}
        </div>
        {isEditing ? (
          <textarea
            className={styles.editInput}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p className={`text-regular text-sm ${styles.content}`}>{content}</p>
        )}
      </div>
    </li>
  );
}
