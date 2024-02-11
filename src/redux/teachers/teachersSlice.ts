import { PayloadAction, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import {
  addToFavorites,
  bookLesson,
  deleteFromFavorites,
  getFavorites,
  getNextTeachers,
  getTeachers,
} from "./thunk";
import {
  allFavoritesFulfilled,
  allFavoritesRejected,
  getNextTeachersFulfilled,
  getTeachersFulfilled,
  getTeachersPending,
  getTeachersRejected,
  updateTeachersFulfilled,
  updateTeachersPending,
  updateTeachersRejected,
} from "./operations";

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
      .addCase(getTeachers.fulfilled, getTeachersFulfilled)
      .addCase(getNextTeachers.fulfilled, getNextTeachersFulfilled)
      .addCase(getFavorites.fulfilled, allFavoritesFulfilled)
      .addCase(getFavorites.rejected, allFavoritesRejected)
      .addMatcher(
        isAnyOf(
          getTeachers.pending,
          getNextTeachers.pending,
          getFavorites.pending
        ),
        getTeachersPending
      )
      .addMatcher(
        isAnyOf(getTeachers.rejected, getNextTeachers.rejected),
        getTeachersRejected
      )
      .addMatcher(
        isAnyOf(
          addToFavorites.pending,
          deleteFromFavorites.pending,
          bookLesson.pending
        ),
        updateTeachersPending
      )
      .addMatcher(
        isAnyOf(
          addToFavorites.fulfilled,
          deleteFromFavorites.fulfilled,
          bookLesson.fulfilled
        ),
        updateTeachersFulfilled
      )
      .addMatcher(
        isAnyOf(
          addToFavorites.rejected,
          deleteFromFavorites.rejected,
          bookLesson.rejected
        ),
        updateTeachersRejected
      ),
});

export const teachersReducer = teachersSlice.reducer;

export const { setLanguage, setLevel, setPrice, resetFilters, nextPage } =
  teachersSlice.actions;
