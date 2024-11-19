import { useAwards } from "@/entities/awards/api/hooks";
import styles from "./AwardsPage.module.css";
import NominatedCard from "./NominatedCard";

export default function AwardsPage() {
  const awardsId = sessionStorage.getItem("awardsId")
    ? parseInt(sessionStorage.getItem("awardsId") as string)
    : -1;

  const awardsName = sessionStorage.getItem("awardsName");

  const { data: nominatedMovies } = useAwards(awardsId);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1 className={`header-h1`}>{awardsName || ""}</h1>
      </div>
      <div className={styles["nominated-list"]}>
        {nominatedMovies !== undefined ? (
          <>
            {nominatedMovies.map((movie, i) => (
              <NominatedCard key={i} idx={i} movie={movie} />
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
