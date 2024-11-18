import { AwardsMovieCardDto } from "@/entities/awards";

export interface AwardsMovieCardType {
  awardsName: string;
  movie: AwardsMovieCardDto;
  strong?: true;
}
