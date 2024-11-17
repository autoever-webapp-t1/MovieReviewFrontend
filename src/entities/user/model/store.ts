import { create } from "zustand";
import { MemberAwardsResponseDto, MemberDto } from "./types";
import { AwardsDto } from "@/entities/awards";

interface UserStore {
  user: MemberDto | null;
  award: AwardsDto | null;
  setUser: (newUser: MemberAwardsResponseDto) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  award: null,
  setUser: (newUser: MemberAwardsResponseDto) =>
    set({ user: newUser.member, award: newUser.award }),
}));
