import { useMemo } from "react";
import styles from "./MyPostItem.module.css";
import { useNavigate } from "react-router-dom";
import { PostDetailDto } from "@/entities/post/model/types";

interface MyPostItemProps {
  post: PostDetailDto;
}

export default function MyPostItem({ post }: MyPostItemProps) {
  const { title, modifiedDate, textContent, mainImgUrl, postId } = post;

  const navigate = useNavigate();

  const date: string = useMemo(() => {
    const d = new Date(Date.parse(modifiedDate));

    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }, [modifiedDate]);

  return (
    <div
      className={styles.container}
      onClick={() => {
        navigate(`/post/${postId}`);
      }}
    >
      {mainImgUrl && (
        <div className={styles["thumbnail-wrapper"]}>
          <img src={mainImgUrl} alt="ThumbnailImg" />
        </div>
      )}
      <div className={styles.content}>
        <h3 className="text-bold text-md">{title}</h3>
        <p className={`${styles.date} text-regular text-sm`}>{date}</p>
        <p className={`${styles.text} text-regular text-md`}>{textContent}</p>
      </div>
    </div>
  );
}
