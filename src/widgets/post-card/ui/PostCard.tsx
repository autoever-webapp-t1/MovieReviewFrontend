import { formatDate } from "@/utils/dateUtils";
import styles from "./PostCard.module.css";
import ProfileImage from "@/widgets/profile-image";
import Separator from "@/widgets/separator";

interface PostCardProps {
  title: string;
  preview: string;
  author: string;
  authorProfileImage: string;
  likeCount: number;
  thumbnail: string;
  createdAt: string;
}

export default function PostCard({
  title,
  preview,
  author,
  authorProfileImage,
  likeCount,
  thumbnail,
  createdAt,
}: PostCardProps) {
  return (
    <li className={styles.postCard}>
      <div className={styles.postContent}>
        <div className={`${styles.postTitle} header-h4`}>{title}</div>
        <div className={`${styles.postPreview} text-sm text-regular`}>
          {preview}
        </div>
        <div className={styles.postMeta}>
          <ProfileImage src={authorProfileImage} size={32} />
          <span className={styles.author}>{author}</span>
          <Separator />
          <span className={styles.createdDate}>{formatDate(createdAt)}</span>
          <Separator />
          <span className={styles.likeCount}>♥️ {likeCount}</span>
        </div>
      </div>
      <div className={styles["post-thumbnail-container"]}>
        <img
          src={thumbnail}
          width={120}
          height={120}
          className={styles.postThumbnail}
        ></img>
      </div>
    </li>
  );
}
