import { Score } from "@/entities/movie";

export interface AwardsDto {
  awardsId: number;
  awardName: string;
  nominated1: number;
  nominated2: number;
  nominated3: number;
  nominated4: number;
  startDateTime: string;
  endDateTime: string;
  topMovieId: number;
  nextAwardName: string;
}

export interface AwardsMovieCardDto {
  movieId: number;
  movieTitle: string;
  moviePoster: string;
  score: Score;
}

export interface AwardsPastListDto {
  awardsId: number;
  awardsName: string;
  nominatedMovies: AwardsMovieCardDto[];
}
