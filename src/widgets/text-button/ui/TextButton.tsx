import styles from "./TextButton.module.css";

interface TextButtonProps {
  color: "primary" | "sub";
  onClick: () => void;
  children: string;
  disabled?: boolean;
}

export default function TextButton({
  color,
  onClick,
  children,
  disabled,
}: TextButtonProps) {
  return (
    <button
      className={`${styles.button} ${
        color === "primary" ? styles.primary : styles.sub
      } text-md text-bold`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
