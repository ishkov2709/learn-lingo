import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Theme, initialState } from "./initialState";

const themesSlice = createSlice({
  name: "themes",
  initialState: initialState,
  reducers: {
    setTheme: (state, { payload }: PayloadAction<Theme>) => {
      state.currentTheme = payload;
      localStorage.setItem("theme", payload);
    },
  },
});

export const themesReducer = themesSlice.reducer;

export const { setTheme } = themesSlice.actions;
