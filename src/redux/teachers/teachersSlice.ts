import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { getNextTeachers, getTeachers } from "./thunk";

const teachersSlice = createSlice({
  name: "teachers",
  initialState: initialState,
  reducers: {
    setLanguage: (state, { payload }: PayloadAction<{ value: string }>) => {
      state.filter.languages = payload.value;
      state.pagination.page = 0;
    },
    setLevel: (state, { payload }: PayloadAction<{ value: string }>) => {
      state.filter.levels = payload.value;
      state.pagination.page = 0;
    },
    setPrice: (state, { payload }: PayloadAction<{ value: string }>) => {
      state.filter.price = payload.value;
      state.pagination.page = 0;
    },
    resetFilters: (state) => {
      state.filter.languages = "";
      state.filter.levels = "";
      state.filter.price = "";
      state.pagination.page = 0;
    },
    nextPage: (state) => {
      state.pagination.page = state.pagination.page + 1;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getTeachers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTeachers.fulfilled, (state, { payload }) => {
        state.teachers = [...payload];
        state.isLoading = false;
      })
      .addCase(getTeachers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.teachers = [];
      })
      .addCase(getNextTeachers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNextTeachers.fulfilled, (state, { payload }) => {
        state.teachers = [...state.teachers, ...payload];
        state.isLoading = false;
      })
      .addCase(getNextTeachers.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      }),
});

export const teachersReducer = teachersSlice.reducer;

export const { setLanguage, setLevel, setPrice, resetFilters, nextPage } =
  teachersSlice.actions;
