import { ReactNode } from "react";
import { useModalStore } from "@/widgets/app-modal/model/store";
import RatingModal from "@/widgets/rating-modal";
import AwardsModal from "@/widgets/awards-modal";
import { AwardsModalProps, RatingModalProps } from "../model/types";

interface AppModalProps {
  children: ReactNode;
}

export default function AppModal({ children }: AppModalProps) {
  const { openModal, modalProps } = useModalStore();

  return (
    <>
      {children}
      {openModal === "ratingModal" ? (
        <RatingModal
          movieId={(modalProps as RatingModalProps).movieId}
          myReview={(modalProps as RatingModalProps).myReview}
        />
      ) : openModal === "awardsModal" ? (
        <AwardsModal awardName={(modalProps as AwardsModalProps).awardName} />
      ) : (
        <></>
      )}
    </>
  );
}
