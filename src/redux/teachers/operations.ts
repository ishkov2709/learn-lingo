import { PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "./initialState";
import { TeacherProps } from "@/components/card/card";

export const getTeachersPending = (state: InitialState) => {
  state.isLoading = true;
  state.error = null;
};

export const getTeachersFulfilled = (
  state: InitialState,
  { payload }: PayloadAction<TeacherProps[]>
) => {
  state.teachers = [...payload];
  state.isLoading = false;
};

export const getNextTeachersFulfilled = (
  state: InitialState,
  { payload }: PayloadAction<TeacherProps[]>
) => {
  state.teachers = [...state.teachers, ...payload];
  state.isLoading = false;
};

export const getTeachersRejected = (
  state: InitialState,
  { payload }: PayloadAction<string | null | unknown>
) => {
  state.isLoading = false;
  state.error = payload;
  state.teachers = [];
};
