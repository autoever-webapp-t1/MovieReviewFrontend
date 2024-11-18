import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Select.module.css";
import ArrowDownImg from "@assets/arrow-down.svg";

interface SelectProps {
  items: string[];
  selectedIdx: number;
  onChange: (newSelectedIdx: number) => void;
}

export default function Select({ items, selectedIdx, onChange }: SelectProps) {
  const [isOpen, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      )
        setOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleInputClick = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  const handleItemClick = useCallback(
    (idx: number) => {
      onChange(idx);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <div className={styles.container} ref={containerRef}>
      <div
        className={`${styles.input} text-bold text-md`}
        onClick={handleInputClick}
      >
        {items[selectedIdx]}
        <div className={styles["icon-wrapper"]}>
          <img src={ArrowDownImg} alt="ArrowDownImg" />
        </div>
      </div>
      {isOpen && (
        <div className={styles["item-box"]}>
          {items.map((item, i) => (
            <div
              key={i}
              className={`${styles.item} text-regular text-md`}
              onClick={() => handleItemClick(i)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
