import styles from "./MainButton.module.css";

interface MainButtonProps {
  color: "primary" | "sub";
  onClick: () => void;
  children: string;
  fontSize?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
}

export default function MainButton({
  color,
  onClick,
  disabled,
  fontSize = "md",
  children,
}: MainButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${
        color === "primary" ? styles.primary : styles.sub
      } text-${fontSize} text-bold ${styles["padding-" + fontSize]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
