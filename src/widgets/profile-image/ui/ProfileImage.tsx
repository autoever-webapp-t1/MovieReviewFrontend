import styles from "./ProfileImage.module.css";

interface CircularImageProps {
  src: string;
  alt?: string;
  size: number;
}

export default function ProfileImage({ src, alt, size }: CircularImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={styles.circularImage}
    />
  );
}
