import ProfileImage from "@/widgets/profile-image";
import styles from "./PostMeta.module.css";
import Separator from "@/widgets/separator";
import { formatDate } from "@/shared/lib/dateUtils";

interface PostMetaProps {
  authorProfileImage: string;
  author: string;
  createdAt: string;
  likeCount?: number;
  isUpdated?: boolean;
}

export default function PostMeta({
  authorProfileImage,
  author,
  createdAt,
  likeCount,
  isUpdated = false,
}: PostMetaProps) {
  return (
    <div className={styles.postMeta}>
      <ProfileImage src={authorProfileImage} size={40} />
      <span className={styles.author}>{author}</span>
      <Separator />
      <span className={styles.createdDate}>
        {formatDate(createdAt)}
        {isUpdated && " (수정됨)"}
      </span>
      {/* {likeCount !== undefined && (
        <>
          <Separator />
          <span className={styles.likeCount}>♥️ {likeCount}</span>
        </>
      )} */}
    </div>
  );
}
