import { ReactNode, useCallback } from "react";
import styles from "./BaseModal.module.css";
import ArrowLeftImg from "@assets/arrow-left.svg";
import { useModalStore } from "../../app-modal/model/store";

interface BaseModalProps {
  title: string;
  children: ReactNode;
}

export default function BaseModal({ title, children }: BaseModalProps) {
  const setOpenModal = useModalStore((state) => state.setOpenModal);

  const handleClose = useCallback(() => {
    setOpenModal(null, null);
  }, []);

  return (
    <div className={styles.wrapper} onClick={handleClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.header} text-md text-bold`}>
          <button className={styles["back-button"]} onClick={handleClose}>
            <img src={ArrowLeftImg} alt="ArrowLeftImg" />
          </button>
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}
