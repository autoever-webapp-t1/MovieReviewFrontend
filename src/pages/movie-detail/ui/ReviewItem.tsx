import { ReviewDetailDto, useUpdateReview } from "@/entities/movie";
import styles from "./ReviewItem.module.css";
import ProfileImage from "@/widgets/profile-image";
import ScoreChart from "@/widgets/score-chart";
import { useCallback, useMemo, useState } from "react";
import CustomRating from "@/widgets/CustomRating";
import MainButton from "@/widgets/main-button/ui/MainButton";
import { useQueryClient } from "@tanstack/react-query";

interface ReviewItemProps {
  review: ReviewDetailDto;
  isMine: boolean;
}

export default function ReviewItem({ review, isMine }: ReviewItemProps) {
  const [isEdit, setEdit] = useState(
    review.content === null && isMine ? true : false
  );
  const [editValue, setEditValue] = useState(review.content || "");

  const queryClient = useQueryClient();

  const { mutate } = useUpdateReview();

  const {
    profile,
    nickname,
    content,
    actorSkill,
    sceneSkill,
    lineSkill,
    directorSkill,
    storySkill,
    musicSkill,
  } = review;

  const totalSkill = useMemo(() => {
    return (
      Math.floor(
        ((actorSkill +
          sceneSkill +
          lineSkill +
          directorSkill +
          storySkill +
          musicSkill) *
          10) /
          6
      ) / 20
    );
  }, [
    actorSkill,
    sceneSkill,
    lineSkill,
    directorSkill,
    storySkill,
    musicSkill,
  ]);

  const handleSaveClick = useCallback(() => {
    const newReview: ReviewDetailDto = {
      ...review,
      content: editValue.length === 0 ? null : editValue,
    };

    mutate(
      { movieId: review.movieId, review: newReview },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["movie", review.movieId],
          });
          queryClient.invalidateQueries({
            queryKey: ["movie", review.movieId, "review"],
          });

          if (editValue.length === 0) {
            setEdit(true);
          } else setEdit(false);
        },
      }
    );
  }, [review, editValue, queryClient]);

  return (
    <div className={styles.container}>
      <div className={styles["profile-img-wrapper"]}>
        <ProfileImage src={profile} alt="ProfileImg" size={32} />
      </div>
      <div className={`${styles.content} text-light text-md`}>
        <div className={styles.header}>
          <div className={`${styles.username} text-bold text-md`}>
            {nickname}
          </div>
          <div className={styles.rating}>
            <CustomRating size="small" value={totalSkill} />
          </div>
        </div>
        {isEdit ? (
          <>
            <textarea
              className={`text-regular text-sm`}
              value={editValue}
              onChange={(e) => {
                setEditValue(e.target.value);
              }}
            />
          </>
        ) : (
          content
        )}
        {isMine && (
          <div className={styles["submit-wrapper"]}>
            {!isEdit ? (
              <>
                <MainButton
                  color="primary"
                  onClick={() => {
                    setEdit(true);
                  }}
                  fontSize="sm"
                >
                  수정
                </MainButton>
              </>
            ) : (
              <>
                {review.content !== null && (
                  <MainButton
                    color="primary"
                    onClick={() => {
                      setEdit(false);
                      setEditValue(review.content!);
                    }}
                    fontSize="sm"
                  >
                    취소
                  </MainButton>
                )}
                <MainButton
                  color="primary"
                  onClick={handleSaveClick}
                  fontSize="sm"
                >
                  저장
                </MainButton>
              </>
            )}
          </div>
        )}
      </div>
      <div className={styles["chart-wrapper"]}>
        <ScoreChart
          size="small"
          data={[
            {
              movieTitle: "",
              actorSkill,
              sceneSkill,
              lineSkill,
              directorSkill,
              storySkill,
              musicSkill,
            },
          ]}
        />
      </div>
    </div>
  );
}
