import { AwardsMovieCardDto } from "@/entities/awards";
import styles from "./AwardsMovieCard.module.css";
import { useNavigate } from "react-router-dom";
import ScoreChart from "@/widgets/score-chart";
import MovieInfoImg from "@assets/movie-info.svg";
import { useMemo } from "react";

interface AwardsMovieCardProps {
  movie: AwardsMovieCardDto;
  awardsName: string;
  strong?: true;
}

export default function AwardsMovieCard({
  awardsName,
  movie,
  strong,
}: AwardsMovieCardProps) {
  const { movieId, movieTitle, moviePoster, score } = movie;
  console.log(moviePoster);

  const posterPath = useMemo(() => {
    return JSON.parse(moviePoster)[0].poster_path;
  }, [moviePoster]);

  console.log(posterPath);

  const navigate = useNavigate();

  return (
    <div
      className={`${strong ? styles["container-strong"] : styles.container}`}
    >
      <div
        className={`${styles["awards-name"]} ${
          strong ? "header-h2" : "header-h3"
        }`}
      >
        {awardsName}
      </div>
      <div
        className={`${styles["card-container"]} ${strong ? styles.strong : ""}`}
        onClick={() => {
          navigate(`/movie/${movieId}`);
        }}
      >
        <div className={styles["background-img-wrapper"]}>
          <img
            src={`https://image.tmdb.org/t/p/w200${posterPath}`}
            alt="PosterImg"
          />
        </div>
        <div className={styles["info-box"]}>
          <h3 className="text-md text-bold">{movieTitle}</h3>
          <p className="text-xs text-regular">
            총점 {score ? score.totalAverageSkill : 0}/10
          </p>
          {/* <p className="text-xs text-regular">{release_date}</p> */}
          <div className={styles["chart-wrapper"]}>
            <ScoreChart
              size="small"
              data={
                score
                  ? [
                      {
                        movieTitle: movieTitle,
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
                        movieTitle: movieTitle,
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
            <img src={MovieInfoImg} alt="MovieInfoImg" />
          </div>
        </div>
      </div>
    </div>
  );
}
