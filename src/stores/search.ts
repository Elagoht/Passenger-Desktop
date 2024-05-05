import { create } from "zustand"

interface searchSlice {
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export const useSearchSlice = create<searchSlice>((set) => ({
  searchTerm: "",

  setSearchTerm: (term) => set({
    searchTerm: term
  })
}))