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

export interface CreditDto {
  type: string;
  name: string;
  profilePath: string;
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
