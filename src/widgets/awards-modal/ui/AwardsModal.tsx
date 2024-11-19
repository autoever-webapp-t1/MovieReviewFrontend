import BaseModal from "@/widgets/base-modal";
import styles from "./AwardsModal.module.css";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import AwardsModalBgImg from "@assets/awards-modal-bg.png";
import MainButton from "@/widgets/main-button/ui/MainButton";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useModalStore } from "@/widgets/app-modal/model/store";

export default function AwardsModal() {
  const awardsName = sessionStorage.getItem("awardsName")!;

  const navigate = useNavigate();
  const { setOpenModal } = useModalStore();

  const handleClick = useCallback(() => {
    setOpenModal(null, null);
    navigate("/awards/history");
  }, []);

  return (
    <BaseModal title="어워즈 결과 발표">
      <div className={styles.container}>
        <div className={styles["bg-wrapper"]}>
          <img src={AwardsModalBgImg} alt="AwardsModalBgImg" />
          <div className={`${styles.box} header-h3`}>
            <span className="header-h1">{awardsName}</span>
            <p>투표 결과가 발표되었습니다.</p>
            <div className={styles["button-wrapper"]}>
              <MainButton color="primary" fontSize="md" onClick={handleClick}>
                확인하러가기
              </MainButton>
            </div>
          </div>
        </div>
      </div>
      <Fireworks autorun={{ speed: 3, duration: 2000 }} />
    </BaseModal>
  );
}
