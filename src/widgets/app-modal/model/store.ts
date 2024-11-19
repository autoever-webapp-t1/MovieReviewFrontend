import { create } from "zustand";
import { ModalPropsType } from "./types";

type ModalType = null | "ratingModal" | "awardsModal";

interface ModalStore {
  openModal: ModalType;
  modalProps: ModalPropsType;
  setOpenModal: (
    newOpenModal: ModalType,
    newModalProps: ModalPropsType
  ) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  openModal: null,
  modalProps: null,
  setOpenModal: (newOpenModal: ModalType, newModalProps: ModalPropsType) =>
    set({ openModal: newOpenModal, modalProps: newModalProps }),
}));
