import styles from "./MainButton.module.css";

interface MainButtonProps {
  color: "primary" | "sub";
  onClick: () => void;
  children: string;
  disabled?: boolean;
}

export default function MainButton({
  color,
  onClick,
  disabled,
  children,
}: MainButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${
        color === "primary" ? styles.primary : styles.sub
      } text-md text-bold`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
