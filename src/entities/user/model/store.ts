import { create } from "zustand";
import { MemberDto } from "./types";

interface UserStore {
  user: MemberDto | null;
  setUser: (newUser: MemberDto) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (newUser: MemberDto) => set({ user: newUser }),
}));
