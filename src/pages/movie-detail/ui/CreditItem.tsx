import ProfileImage from "@/widgets/profile-image";
import styles from "./CreditItem.module.css";
import { CreditDto } from "@/entities/movie";

interface CreditItemProps {
  credit: CreditDto;
}

export default function CreditItem({ credit }: CreditItemProps) {
  const { profilePath, name, type } = credit;

  return (
    <div className={styles.container}>
      <div className={styles["avatar-wrapper"]}>
        <ProfileImage src={profilePath} alt="CreditImg" size={60} />
      </div>
      <div className={styles.content}>
        <p className="text-bold text-md">{name}</p>
        <p className="text-regular text-sm">{type}</p>
      </div>
    </div>
  );
}
