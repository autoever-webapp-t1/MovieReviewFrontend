import { useMyReview } from "@/entities/user/api/hooks";
import styles from "./MyReviewContent.module.css";
import { useMemo } from "react";
import MyReviewItem from "./MyReviewItem";

export default function MyReviewContent() {
  const { data } = useMyReview();
  const reviews = useMemo(() => {
    if (data) {
      return data.pages.flatMap((page) => page.dtoList);
    } else return [];
  }, [data]);

  console.log(reviews);

  return (
    <div className={styles.container}>
      {reviews.map((review, i) => (
        <MyReviewItem key={i} review={review} />
      ))}
    </div>
  );
}
