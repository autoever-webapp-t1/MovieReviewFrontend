export interface Score {
  avgSceneSkill: number;
  totalAverageSkill: number;
  avgLineSkill: number;
  avgStorySkill: number;
  avgDirectorSkill: number;
  avgMusicSkill: number;
  avgActorSkill: number;
}

export interface MovieCardDto {
  movieId: number;
  title: string;
  overview: string;
  poster_path: string;
  score: Score | null;
  myScore: Score | null;
  release_date: string;
  genre_ids: number[];
}
