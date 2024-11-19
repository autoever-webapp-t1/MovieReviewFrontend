import ProfileImage from "@/widgets/profile-image";
import styles from "./CreditItem.module.css";
import { CreditDto } from "@/entities/movie";

interface CreditItemProps {
  credit: CreditDto;
}

export default function CreditItem({ credit }: CreditItemProps) {
  const { profile, name, type } = credit;

  return (
    <div className={styles.container}>
      <div className={styles["avatar-wrapper"]}>
        <ProfileImage
          src={`https://image.tmdb.org/t/p/w45${profile}`}
          alt="CreditImg"
          size={60}
        />
      </div>
      <div className={styles.content}>
        <p className="text-bold text-md">{name}</p>
        <p className="text-regular text-sm">
          {type === "Acting" ? "배우" : "감독"}
        </p>
      </div>
    </div>
  );
}
