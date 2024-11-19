export interface MyReviewDetailDto {
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
  poster_path: string;
}
