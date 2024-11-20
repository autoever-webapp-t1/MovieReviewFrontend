import { ReviewDetailDto } from "@/entities/movie";

export interface RatingModalProps {
  movieId: number;
  myReview?: ReviewDetailDto | null;
}

export interface AwardsModalProps {
  awardName: string;
}

export type ModalPropsType = RatingModalProps | AwardsModalProps | null;
