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
  mySceneSkill: number;
  myAvgSkill: number;
  myLineSkill: number;
  myMusicSkill: number;
  myStorySkill: number;
  myDirectorSkill: number;
  myActorSkill: number;
}

export interface MovieCardDto {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  score: Score | null;
  myScore: MyScore | null;
  release_date: string;
  genre_ids: string;
}

export interface MovieDetailDto {
  id: number;
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

export interface VideoDto {
  key: string;
  type: string;
}

export interface ReviewDetailDto {
  reviewId: number;
  movieId: number;
  memberId: number;
  title: string;
  nickname: string;
  profile: string;
  content: string | null;
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

export interface MovieWithReviewsDto {
  movieDetails: MovieDetailDto;
  reviews: ReviewDetailDto[];
}

export interface MovieSearchResponse {
  dtoList: MovieCardDto[];
  pageNumList: number[];
  pageRequestDto: object;
  prev: boolean;
  next: boolean;
  totalCount: number;
  prevPage: number;
  nextPage: number;
  totalPage: number;
  current: number;
}

export interface MovieRecommendationDto {
  title: string;
  recommendations: MovieCardDto[];
}
