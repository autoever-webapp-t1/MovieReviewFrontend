import AvgScoreContent from "./AvgScoreContent";
import styles from "./ContentBox.module.css";
import MyPostContent from "./MyPostContent";
import MyReviewContent from "./MyReviewContent";

interface ContentBoxProps {
  selectedContent: string;
}

export default function ContentBox({ selectedContent }: ContentBoxProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.header} header-h2`}>{selectedContent}</div>
      {selectedContent === "통계" ? (
        <AvgScoreContent />
      ) : selectedContent === "나의 리뷰" ? (
        <MyReviewContent />
      ) : selectedContent === "나의 포스트" ? (
        <MyPostContent />
      ) : (
        <></>
      )}
    </div>
  );
}
