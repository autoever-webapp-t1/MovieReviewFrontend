import { ReviewDetailDto } from "@/entities/movie";

export interface RatingModalProps {
  movieId: number;
  myReview?: ReviewDetailDto | null;
}

export type ModalPropsType = RatingModalProps | null;
