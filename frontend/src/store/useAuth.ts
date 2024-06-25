import { User } from "@/types/User";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface AuthState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    getUser: () => User | null;
  }
  
  const useAuthStore = create<AuthState>()(
    persist(
      (set, get) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
        getUser: () => get().user,
      }),
      {
        name: "auth-storage",
      }
    )
  );
  
  export default useAuthStore;