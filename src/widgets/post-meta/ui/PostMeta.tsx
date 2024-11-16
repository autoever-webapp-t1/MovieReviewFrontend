import ProfileImage from "@/widgets/profile-image";
import styles from "./PostMeta.module.css";
import Separator from "@/widgets/separator";
import { formatDate } from "@/shared/utils/dateUtils";

interface PostMetaProps {
  authorProfileImage: string;
  author: string;
  createdAt: string;
  likeCount?: number;
}

export default function PostMeta({
  authorProfileImage,
  author,
  createdAt,
  likeCount,
}: PostMetaProps) {
  return (
    <div className={styles.postMeta}>
      <ProfileImage src={authorProfileImage} size={32} />
      <span className={styles.author}>{author}</span>
      <Separator />
      <span className={styles.createdDate}>{formatDate(createdAt)}</span>
      {likeCount !== undefined && (
        <>
          <Separator />
          <span className={styles.likeCount}>♥️ {likeCount}</span>
        </>
      )}
    </div>
  );
}
