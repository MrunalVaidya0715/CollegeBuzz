import { create } from "zustand";

interface DialogState {
  isLoginOpen: boolean;
  setIsLoginOpen: (isOpen: boolean) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  isAskQuesOpen: boolean;
  setIsAskQuesOpen: (isOpen: boolean) => void;
  isAnsQuesOpen: boolean;
  setIsAnsQuesOpen: (isOpen: boolean) => void;
  isEditQuesOpen: boolean;
  setIsEditQuesOpen: (isOpen: boolean) => void;
  isDeleteQuesOpen: boolean;
  setIsDeleteQuesOpen: (isOpen: boolean) => void;
}

const useDialogStore = create<DialogState>()((set) => ({
  isLoginOpen: false,
  setIsLoginOpen: (isOpen) => set({ isLoginOpen: isOpen }),
  isDrawerOpen: false,
  setIsDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),
  isAskQuesOpen: false,
  setIsAskQuesOpen: (isOpen) => set({ isAskQuesOpen: isOpen }),
  isAnsQuesOpen: false,
  setIsAnsQuesOpen: (isOpen) => set({ isAnsQuesOpen: isOpen }),
  isEditQuesOpen: false,
  setIsEditQuesOpen: (isOpen) => set({ isEditQuesOpen: isOpen }),
  isDeleteQuesOpen: false,
  setIsDeleteQuesOpen: (isOpen) => set({ isDeleteQuesOpen: isOpen }),
}));

export default useDialogStore;
