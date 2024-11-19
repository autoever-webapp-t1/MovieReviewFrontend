import { ReactNode } from "react";
import styles from "./MenuItem.module.css";

interface MenuItemProps {
  children: ReactNode;
  subLabel?: string;
  selected?: boolean;
  warning?: true;
  onClick: () => void;
}

export default function MenuItem({
  children,
  subLabel,
  selected,
  warning,
  onClick,
}: MenuItemProps) {
  return (
    <button className={styles.container} onClick={onClick}>
      <span
        className={`${styles.name} ${
          selected ? "text-bold" : "text-regular"
        } text-lg ${warning ? styles.warning : ""}`}
      >
        {children}
      </span>
      <span className={`${styles["sub-label"]} text-regular text-md`}>
        {subLabel}
      </span>
    </button>
  );
}
