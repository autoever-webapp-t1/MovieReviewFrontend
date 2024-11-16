export interface User {
  userId: number;
  email: string;
}

export interface MemberDto {
  memberId: number; //카카오 고유 사용자 ID
  nickname: string; //카카오 사용자 이름
  email: string; //카카오 사용자 이메일
  profile: string; //카카오 사용자 프로필사진
  refreshToken: string; //카카오 사용자 refreshToke
}
