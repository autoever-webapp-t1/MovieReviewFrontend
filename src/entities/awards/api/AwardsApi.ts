import { authAxios } from "@/shared/api/base";

export const fetchPastAwards = async () => {
  const response = await authAxios.get("api/awards/past");

  return response.data;
};
