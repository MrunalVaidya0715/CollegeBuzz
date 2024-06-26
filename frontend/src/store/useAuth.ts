import { User } from "@/types/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  getUser: () => User | null;
  isLoginOpen: boolean;
  setIsLoginOpen: (isOpen: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      getUser: () => get().user,
      isLoginOpen: false,
      setIsLoginOpen: (isOpen) => set({ isLoginOpen: isOpen }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
