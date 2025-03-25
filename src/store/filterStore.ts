import { create } from "zustand";

interface FilterStore {
  searchQuery: string;
  categoryFilter: string;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
}

const useFilterStore = create<FilterStore>((set) => ({
  searchQuery: "",
  categoryFilter: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCategoryFilter: (category) => set({ categoryFilter: category }),
}));

export default useFilterStore;
