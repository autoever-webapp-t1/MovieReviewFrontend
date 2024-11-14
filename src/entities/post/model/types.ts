export interface PostDetailDto {
  postId: number;
  memberId: number;
  title: string;
  content: string;
  nickname: string;
  likesCount: number;
  isLiked: boolean;
  createdDate: string;
  updatedDate: string;
}
