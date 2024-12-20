import { useMemo } from "react";
import styles from "./MyPostContent.module.css";
import { useMyPost } from "@/entities/user/api/hooks";
import MyPostItem from "./MyPostItem";

export default function MyPostContent() {
  const { data, hasNextPage, fetchNextPage } = useMyPost();

  const posts = useMemo(() => {
    if (data) {
      return data.pages.flatMap((page) => page.dtoList);
    } else return [];
  }, [data]);

  return (
    <div className={styles.container}>
      {posts.map((post, i) => (
        <MyPostItem key={i} post={post} />
      ))}
      {hasNextPage && (
        <div className={styles["button-wrapper"]}>
          <button className="text-md text-bold" onClick={() => fetchNextPage()}>
            더 보기
          </button>
        </div>
      )}
    </div>
  );
}
