import styles from "./TextButton.module.css";

interface TextButtonProps {
  color: "primary" | "sub";
  onClick: () => void;
  children: string;
}

export default function TextButton({
  color,
  onClick,
  children,
}: TextButtonProps) {
  return (
    <button
      className={`${styles.button} ${
        color === "primary" ? styles.primary : styles.sub
      } text-md text-bold`}
    >
      {children}
    </button>
  );
}
