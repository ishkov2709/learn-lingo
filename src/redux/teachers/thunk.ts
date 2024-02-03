import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTeachers = createAsyncThunk(
  "teachers/fetchAllTeachers",
  async (_, thunkAPI) => {
    try {
      const data = await fetch("/api/teachers");
      const res = await data.json();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
