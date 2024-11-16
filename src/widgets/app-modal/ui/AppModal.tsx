import { ReactNode } from "react";
import { useModalStore } from "@/widgets/app-modal/model/store";
import RatingModal from "@/widgets/rating-modal";

interface AppModalProps {
  children: ReactNode;
}

export default function AppModal({ children }: AppModalProps) {
  const { openModal, modalProps } = useModalStore();

  return (
    <>
      {children}
      {openModal === "ratingModal" ? (
        <RatingModal movieId={modalProps!.movieId} />
      ) : (
        <></>
      )}
    </>
  );
}
