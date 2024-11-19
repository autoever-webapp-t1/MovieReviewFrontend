import BaseModal from "@/widgets/base-modal";
import styles from "./AwardsModal.module.css";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export default function AwardsModal() {
  return (
    <BaseModal title="어워즈 결과 발표">
      <div className={styles.container}>결과가 발표되었습니다.</div>
      <Fireworks autorun={{ speed: 3, duration: 2000 }} />
    </BaseModal>
  );
}
