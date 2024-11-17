import { noAuthAxios } from "@/shared/api/base";
import { OauthResponseDto, OauthRequestDto } from "../model/types";
import { MemberAwardsResponseDto } from "@/entities/user";
import { AxiosResponse } from "axios";

export const login = async (code: string) => {
  const response = await noAuthAxios.get<OauthResponseDto>(
    `login/oauth/kakao?code=${code}`
  );

  return response.data;
};

export const postLogin = async (at: string, rt: string) => {
  const response = await noAuthAxios.post<
    MemberAwardsResponseDto,
    AxiosResponse<MemberAwardsResponseDto>,
    OauthRequestDto
  >("login/oauth/kakao", {
    accessToken: at,
    refreshToken: rt,
  });

  return response.data;
};
