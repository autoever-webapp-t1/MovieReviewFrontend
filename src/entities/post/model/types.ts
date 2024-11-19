export interface PostDetailDto {
  postId: number;
  memberId: number;
  title: string;
  content: string;
  textContent: string;
  mainImgUrl: string;
  profileImage: string;
  img: string;
  nickname: string;
  likesCount: number;
  liked: boolean;
  createdDate: string;
  updatedDate: string;
}

export interface CommentDto {
  commentId: number;
  postId: number;
  nickname: string;
  content: string;
  memberId: number;
  createdAt: string;
  updatedAt: string;
  profile: string;
}
