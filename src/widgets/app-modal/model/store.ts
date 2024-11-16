import { create } from "zustand";

type ModalType = null | "ratingModal";

interface ModalStore {
  openModal: ModalType;
  setOpenModal: (newOpenModal: ModalType) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  openModal: null,
  setOpenModal: (newOpenModal: ModalType) => set({ openModal: newOpenModal }),
}));
