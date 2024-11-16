import ScoreChart from "@/widgets/score-chart";
import { MovieCardDto } from "../model/types";
import styles from "./MovieCard.module.css";
import AddLibraryImg from "@assets/add_library.svg";
import CheckedLibraryImg from "@assets/checked_library.svg";

interface MovieCardProps {
  movieCard: MovieCardDto;
  selected?: boolean;
  onClick: () => void;
}

export default function MovieCard({
  movieCard,
  selected,
  onClick,
}: MovieCardProps) {
  const { title, score, release_date, poster_path } = movieCard;
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles["background-img-wrapper"]}>
        <img
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt="PosterImg"
        />
      </div>

      {!selected ? (
        <div className={styles["info-box"]}>
          <h3 className="text-md text-bold">{title}</h3>
          <p className="text-xs text-regular">
            총점 {score ? score.totalAverageSkill : 0}/10
          </p>
          <p className="text-xs text-regular">{release_date}</p>
          <div className={styles["chart-wrapper"]}>
            <ScoreChart
              size="small"
              data={
                score
                  ? [
                      {
                        movieTitle: title,
                        sceneSkill: score.avgSceneSkill,
                        actorSkill: score.avgActorSkill,
                        directorSkill: score.avgDirectorSkill,
                        lineSkill: score.avgLineSkill,
                        musicSkill: score.avgMusicSkill,
                        storySkill: score.avgStorySkill,
                      },
                    ]
                  : [
                      {
                        movieTitle: title,
                        sceneSkill: 0,
                        actorSkill: 0,
                        directorSkill: 0,
                        lineSkill: 0,
                        musicSkill: 0,
                        storySkill: 0,
                      },
                    ]
              }
            />
          </div>
          <div className={styles["icon-wrapper"]}>
            <img src={AddLibraryImg} alt="AddLibraryImg" />
          </div>
        </div>
      ) : (
        <div className={styles["info-box-selected"]}>
          <div className={styles["icon-wrapper"]}>
            <img
              src={CheckedLibraryImg}
              alt="CheckedLibraryImg"
              style={{ opacity: 1 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
