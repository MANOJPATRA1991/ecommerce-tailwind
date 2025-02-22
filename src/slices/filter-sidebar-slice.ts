import { createSlice } from "@reduxjs/toolkit";

type FilterSidebarState = {
  isOpen?: boolean;
};

const initialState: FilterSidebarState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: "filter-sidebar",
  initialState,
  reducers: {
    toggleFilterSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const filterSidebarReducer = sidebarSlice.reducer;

export const { toggleFilterSidebar } = sidebarSlice.actions;

export default sidebarSlice;
