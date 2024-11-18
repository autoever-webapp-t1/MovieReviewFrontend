export interface PostDetailDto {
  postId: number;
  memberId: number;
  title: string;
  content: string;
  profileImage: string;
  thumbnail?: string;
  nickname: string;
  likesCount: number;
  liked: boolean;
  createdDate: string;
  updatedDate: string;
}

export interface CommentDto {}
