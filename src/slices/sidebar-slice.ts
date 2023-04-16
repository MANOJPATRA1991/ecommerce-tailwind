import { createSlice } from "@reduxjs/toolkit";

type SidebarState = {
  isOpen?: boolean;
};

const initialState: SidebarState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const sidebarReducer = sidebarSlice.reducer;

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice;
