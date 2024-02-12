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
  getNextTeachersPending,
  getNextTeachersRejected,
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
    nextPage: (state) => {
      state.pagination.page = state.pagination.page + 1;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getTeachers.fulfilled, getTeachersFulfilled)
      .addCase(getTeachers.rejected, getTeachersRejected)
      .addCase(getNextTeachers.pending, getNextTeachersPending)
      .addCase(getNextTeachers.fulfilled, getNextTeachersFulfilled)
      .addCase(getNextTeachers.rejected, getNextTeachersRejected)
      .addCase(getFavorites.fulfilled, allFavoritesFulfilled)
      .addCase(getFavorites.rejected, allFavoritesRejected)
      .addMatcher(
        isAnyOf(getTeachers.pending, getFavorites.pending),
        getTeachersPending
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

export const { setLanguage, setLevel, setPrice, nextPage } =
  teachersSlice.actions;
