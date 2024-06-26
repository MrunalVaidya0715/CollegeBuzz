import { create } from "zustand";

interface DialogState {
  isLoginOpen: boolean;
  setIsLoginOpen: (isOpen: boolean) => void;
}

const useDialogStore = create<DialogState>()((set) => ({
  isLoginOpen: false,
  setIsLoginOpen: (isOpen) => set({ isLoginOpen: isOpen }),
}));

export default useDialogStore;
