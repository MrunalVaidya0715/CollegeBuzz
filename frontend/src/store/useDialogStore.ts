import { create } from "zustand";

interface DialogState {
  isLoginOpen: boolean;
  setIsLoginOpen: (isOpen: boolean) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  isAskQuesOpen: boolean;
  setIsAskQuesOpen: (isOpen: boolean) => void;
}

const useDialogStore = create<DialogState>()((set) => ({
  isLoginOpen: false,
  setIsLoginOpen: (isOpen) => set({ isLoginOpen: isOpen }),
  isDrawerOpen: false,
  setIsDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),
  isAskQuesOpen: false,
  setIsAskQuesOpen: (isOpen) => set({ isAskQuesOpen: isOpen }),
}));

export default useDialogStore;
