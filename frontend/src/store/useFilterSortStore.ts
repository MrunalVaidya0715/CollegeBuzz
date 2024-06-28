import {create} from 'zustand';

interface QuestionFilterState {
  branch: string;
  category: string;
  sortBy: string;
  setBranch: (branch: string) => void;
  setCategory: (category: string) => void;
  setSortBy: (sortBy: string) => void;
}

const useQuestionFilterStore = create<QuestionFilterState>((set) => ({
  branch: 'All',
  category: 'all',
  sortBy: 'latest',
  setBranch: (branch) => set({ branch }),
  setCategory: (category) => set({ category }),
  setSortBy: (sortBy) => set({ sortBy }),
}));

export default useQuestionFilterStore;
