import { useCallback, useState } from "react";
import PrimarySlider from "./PrimarySlider";
import styles from "./RatingModal.module.css";
import BaseModal from "@/widgets/base-modal";
import ScoreChart from "@/widgets/score-chart";
import MainButton from "@/widgets/main-button/ui/MainButton";
import { RatingModalProps } from "@/widgets/app-modal/model/types";
import {
  MovieCardDto,
  NewReviewDto,
  ReviewDetailDto,
  useRateMovieForSignup,
  useUpdateReview,
} from "@/entities/movie";
import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useModalStore } from "@/widgets/app-modal/model/store";

type NewReview = UseMutationResult<
  string,
  any,
  {
    movieId: number;
    newReview: NewReviewDto;
  },
  unknown
>;

type UpdateReview = UseMutationResult<
  string,
  any,
  {
    movieId: number;
    review: ReviewDetailDto;
  },
  unknown
>;

export default function RatingModal({ movieId, myReview }: RatingModalProps) {
  const { setOpenModal } = useModalStore();
  const queryClient = useQueryClient();

  const [sceneScore, setSceneScore] = useState(myReview?.sceneSkill || 0);
  const [actorScore, setActorScore] = useState(myReview?.actorSkill || 0);
  const [lineScore, setLineScore] = useState(myReview?.lineSkill || 0);
  const [directorScore, setDirectorScore] = useState(
    myReview?.directorSkill || 0
  );
  const [musicScore, setMusicScore] = useState(myReview?.musicSkill || 0);
  const [storyScore, setStoryScore] = useState(myReview?.storySkill || 0);

  const rateMovie = myReview ? useUpdateReview() : useRateMovieForSignup();

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
    if (!myReview) {
      (rateMovie as NewReview).mutate(
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
            if (myReview === undefined) {
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
            } else {
              queryClient.invalidateQueries({
                queryKey: ["movie", movieId],
              });
              queryClient.invalidateQueries({
                queryKey: ["movie", movieId, "review"],
              });
            }

            setOpenModal(null, null);
          },
        }
      );
    } else {
      const newReview: ReviewDetailDto = {
        ...myReview,
        actorSkill: actorScore,
        directorSkill: directorScore,
        lineSkill: lineScore,
        storySkill: storyScore,
        musicSkill: musicScore,
        sceneSkill: sceneScore,
      };

      (rateMovie as UpdateReview).mutate(
        {
          movieId: myReview.movieId,
          review: newReview,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["movie", movieId],
            });
            queryClient.invalidateQueries({
              queryKey: ["movie", movieId, "review"],
            });

            setOpenModal(null, null);
          },
        }
      );
    }
  }, [
    movieId,
    myReview,
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
