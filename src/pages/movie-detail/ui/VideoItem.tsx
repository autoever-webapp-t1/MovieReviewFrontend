import styles from "./VideoItem.module.css";

interface VideoItemProps {
  src: string;
}

export default function VideoItem({ src }: VideoItemProps) {
  console.log(src);
  return (
    // <iframe
    //   className={styles.container}
    //   src={`https://www.youtube.com/watch?v=${src}`}
    // />

    <iframe
      width="560"
      height="315"
      // src={`https://www.youtube.com/embed/${src}`}
      src={`https://www.youtube.com/embed/FuJ1RiLoq-M`}
      title="YouTube video player"
    ></iframe>
  );
}
