import { createAsyncThunk } from "@reduxjs/toolkit";
import { InitialState } from "./initialState";

export const getTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async (_, thunkAPI) => {
    try {
      const { teachers } = thunkAPI.getState() as {
        teachers: InitialState;
      };
      const { languages, levels, price } = teachers.filter;
      const { perPage, page } = teachers.pagination;

      const data = await fetch(
        `/api/teachers?${"perPage=" + perPage}${"&page=" + page}${
          languages && "&languages=" + languages
        }${levels && "&levels=" + levels}${price && "&price=" + price}`
      );

      const res = await data.json();
      if (res.length === 0)
        return thunkAPI.rejectWithValue({
          message: '"Data is empty"',
        } as { message: string });

      return res;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getNextTeachers = createAsyncThunk(
  "teachers/fetchNextTeachers",
  async (_, thunkAPI) => {
    try {
      const { teachers } = thunkAPI.getState() as {
        teachers: InitialState;
      };
      const { languages, levels, price } = teachers.filter;
      const { perPage, page } = teachers.pagination;

      const data = await fetch(
        `/api/teachers?${"perPage=" + perPage}${"&page=" + page}${
          languages && "&languages=" + languages
        }${levels && "&levels=" + levels}${price && "&price=" + price}`
      );

      const res = await data.json();
      if (res.length === 0)
        return thunkAPI.rejectWithValue({
          message: '"Data is empty"',
        } as { message: string });

      return res;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
