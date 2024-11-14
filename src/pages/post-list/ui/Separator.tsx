import styles from "./Separator.module.css";

export default function Separator({ separator = "|" }) {
  return <div className={styles.separator}>{separator}</div>;
}
