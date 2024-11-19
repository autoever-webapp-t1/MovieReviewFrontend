import { useCallback, useState } from "react";
import ContentBox from "./ContentBox";
import SideBox from "./SideBox";
import styles from "./UserPage.module.css";

export default function UserPage() {
  const [selectedContent, setSelectedContent] = useState("통계");

  const handleMenuItemSelect = useCallback((newContent: string) => {
    setSelectedContent(newContent);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <SideBox
          selectedContent={selectedContent}
          onMenuItemSelect={handleMenuItemSelect}
        />
        <ContentBox selectedContent={selectedContent} />
      </div>
    </div>
  );
}
