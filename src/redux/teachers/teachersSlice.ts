import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { getTeachers } from "./thunk";

const teachersSlice = createSlice({
  name: "teachers",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getTeachers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTeachers.fulfilled, (state, { payload }) => {
        state.teachers = [...payload];
        state.isLoading = false;
      })
      .addCase(getTeachers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

export const teachersReducer = teachersSlice.reducer;
