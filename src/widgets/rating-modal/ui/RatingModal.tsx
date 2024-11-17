import { useCallback, useState } from "react";
import PrimarySlider from "./PrimarySlider";
import styles from "./RatingModal.module.css";
import BaseModal from "@/widgets/base-modal";
import ScoreChart from "@/widgets/score-chart";
import MainButton from "@/widgets/main-button/ui/MainButton";
import { RatingModalProps } from "@/widgets/app-modal/model/types";
import { MovieCardDto, useRateMovieForSignup } from "@/entities/movie";
import { useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "@/widgets/app-modal/model/store";

export default function RatingModal({ movieId }: RatingModalProps) {
  const { setOpenModal } = useModalStore();
  const queryClient = useQueryClient();

  const [sceneScore, setSceneScore] = useState(0);
  const [actorScore, setActorScore] = useState(0);
  const [lineScore, setLineScore] = useState(0);
  const [directorScore, setDirectorScore] = useState(0);
  const [musicScore, setMusicScore] = useState(0);
  const [storyScore, setStoryScore] = useState(0);

  const rateMovie = useRateMovieForSignup();

  const handleSceneScoreChange = useCallback(
    (_: Event, value: number | number[]) => {
      if (typeof value === "number") setSceneScore(value);
    },
    []
  );

  const handleActorScoreChange = useCallback(
    (_: Event, value: number | number[]) => {
      if (typeof value === "number") setActorScore(value);
    },
    []
  );

  const handleLineScoreChange = useCallback(
    (_: Event, value: number | number[]) => {
      if (typeof value === "number") setLineScore(value);
    },
    []
  );

  const handleDirectorScoreChange = useCallback(
    (_: Event, value: number | number[]) => {
      if (typeof value === "number") setDirectorScore(value);
    },
    []
  );

  const handleMusicScoreChange = useCallback(
    (_: Event, value: number | number[]) => {
      if (typeof value === "number") setMusicScore(value);
    },
    []
  );

  const handleStoryScoreChange = useCallback(
    (_: Event, value: number | number[]) => {
      if (typeof value === "number") setStoryScore(value);
    },
    []
  );

  const handleSaveButtonClick = useCallback(() => {
    if (movieId) {
      rateMovie.mutate(
        {
          movieId,
          newReview: {
            content: null,
            sceneSkill: sceneScore,
            actorSkill: actorScore,
            lineSkill: lineScore,
            directorSkill: directorScore,
            musicSkill: musicScore,
            storySkill: storyScore,
          },
        },
        {
          onSuccess: () => {
            queryClient.setQueryData<MovieCardDto[]>(
              ["movie/topRated"],
              (old) => {
                return old?.map<MovieCardDto>((movieCard) => {
                  if (movieCard.id === movieId) {
                    const newMovieCard: MovieCardDto = {
                      ...movieCard,
                      myScore: {
                        sceneSkill: sceneScore,
                        actorSkill: actorScore,
                        lineSkill: lineScore,
                        directorSkill: directorScore,
                        musicSkill: musicScore,
                        storySkill: storyScore,
                        avgSkill: 0,
                      },
                    };

                    return newMovieCard;
                  } else return movieCard;
                });
              }
            );

            setOpenModal(null, null);
          },
        }
      );
    }
  }, [
    movieId,
    sceneScore,
    actorScore,
    lineScore,
    directorScore,
    musicScore,
    storyScore,
    queryClient,
    setOpenModal,
  ]);

  return (
    <BaseModal title="영화 평가">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles["slider-box"]}>
            <PrimarySlider
              label="미장센"
              value={sceneScore}
              onChange={handleSceneScoreChange}
            />
            <PrimarySlider
              label="연기력"
              value={actorScore}
              onChange={handleActorScoreChange}
            />
            <PrimarySlider
              label="대사"
              value={lineScore}
              onChange={handleLineScoreChange}
            />
            <PrimarySlider
              label="연출력"
              value={directorScore}
              onChange={handleDirectorScoreChange}
            />
            <PrimarySlider
              label="음악"
              value={musicScore}
              onChange={handleMusicScoreChange}
            />
            <PrimarySlider
              label="스토리"
              value={storyScore}
              onChange={handleStoryScoreChange}
            />
          </div>
          <div className={styles["chart-box"]}>
            <ScoreChart
              size="big"
              data={[
                {
                  movieTitle: "",
                  sceneSkill: sceneScore,
                  actorSkill: actorScore,
                  lineSkill: lineScore,
                  directorSkill: directorScore,
                  musicSkill: musicScore,
                  storySkill: storyScore,
                },
              ]}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <MainButton color="primary" onClick={handleSaveButtonClick}>
            저장
          </MainButton>
        </div>
      </div>
    </BaseModal>
  );
}
