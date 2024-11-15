import { create } from "zustand";
import { User } from "./types";

interface UserStore {
  user: User;
  setUser: (newUser: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: { userId: 1, email: "" },
  setUser: (newUser: User) => set({ user: newUser }),
}));
