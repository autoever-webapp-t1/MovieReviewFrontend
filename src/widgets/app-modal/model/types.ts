import { MyScore } from "@/entities/movie";

export interface RatingModalProps {
  movieId: number;
  score?: MyScore | null;
}

export type ModalPropsType = RatingModalProps | null;
