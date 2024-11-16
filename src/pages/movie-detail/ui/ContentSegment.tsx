import { ReactNode } from "react";
import styles from "./ContentSegment.module.css";

interface ContentSegmentProps {
  label: string;
  children: ReactNode;
}

export default function ContentSegment({
  label,
  children,
}: ContentSegmentProps) {
  return (
    <div className={styles.container}>
      <div className={`${styles.label} header-h4`}>{label}</div>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
}
