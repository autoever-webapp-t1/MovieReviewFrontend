export interface Score {
  avgSceneSkill: number;
  totalAverageSkill: number;
  avgLineSkill: number;
  avgStorySkill: number;
  avgDirectorSkill: number;
  avgMusicSkill: number;
  avgActorSkill: number;
}

export interface MyScore {
  sceneSkill: number;
  avgSkill: number;
  lineSkill: number;
  musicSkill: number;
  storySkill: number;
  directorSkill: number;
  actorSkill: number;
}

export interface MovieCardDto {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  score: Score | null;
  myScore: MyScore | null;
  release_date: string;
  genre_ids: number[];
}

export interface MovieDetailDto {
  movieId: number;
  title: string;
  overview: string;
  score: Score;
  images: string;
  videos: string;
  credits: CreditDto[];
  release_date: string;
  runtime: number;
  genres: string;
  recommendations: RecommendDto[];
  myScore: MyScore | null;
}

export interface RecommendDto {
  id: number;
}

export interface ImageDto {
  poster_path: string;
  backdrop_path: string;
}

export interface GenreDto {
  id: number;
  name: string;
}

export interface CreditDto {
  type: string;
  name: string;
  profile: string;
}

export interface ReviewDetailDto {
  reviewId: number;
  movieId: number;
  memberId: number;
  title: string;
  nickname: string;
  profile: string;
  content: string;
  createdDate: string;
  modifyDate: string;
  totalHeart: number;
  myHeart: boolean;
  actorSkill: number;
  directorSkill: number;
  sceneSkill: number;
  musicSkill: number;
  storySkill: number;
  lineSkill: number;
  avgSkill: number;
}

export interface NewReviewDto {
  content: string | null;
  actorSkill: number;
  directorSkill: number;
  sceneSkill: number;
  musicSkill: number;
  storySkill: number;
  lineSkill: number;
}
