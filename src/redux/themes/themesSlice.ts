import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const themesSlice = createSlice({
  name: "themes",
  initialState: initialState,
  reducers: {
    setTheme: (state, { payload }) => {
      state.currentTheme = payload;
    },
  },
});

export const themesReducer = themesSlice.reducer;

export const { setTheme } = themesSlice.actions;
