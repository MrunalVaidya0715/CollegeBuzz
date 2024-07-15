import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FilterBranchState {
  branch: string;
  setBranch: (branch: string) => void;
}

const useFilterBranchStore = create<FilterBranchState>()(
  persist(
    (set) => ({
      branch: "All",
      setBranch: (branch) => set({ branch }),
    }),
    {
      name: "cb-branch",
    }
  )
);

export default useFilterBranchStore;
