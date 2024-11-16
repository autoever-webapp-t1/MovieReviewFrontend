import styles from "./PostCard.module.css";
import PostMeta from "@/widgets/post-meta/ui/PostMeta";

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
        <PostMeta
          authorProfileImage={authorProfileImage}
          author={author}
          createdAt={createdAt}
          likeCount={likeCount}
        />
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
