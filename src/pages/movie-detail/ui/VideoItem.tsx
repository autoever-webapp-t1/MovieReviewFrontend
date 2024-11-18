import styles from "./VideoItem.module.css";

interface VideoItemProps {
  src: string;
}

export default function VideoItem({ src }: VideoItemProps) {
  console.log(src);
  return (
    <iframe
      className={styles.container}
      src={`https://www.youtube.com/embed/${src}`}
    ></iframe>
  );
}
