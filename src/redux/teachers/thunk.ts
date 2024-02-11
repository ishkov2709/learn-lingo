import { createAsyncThunk } from "@reduxjs/toolkit";
import { InitialState } from "./initialState";
import { BookValues } from "@/components/book-form/book-form";

export interface UserToken {
  user: {
    token: string | null;
  };
}

export interface BookParams {
  id: string;
  book: BookValues;
}

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
      if (res.length === 0) {
        return thunkAPI.rejectWithValue({
          message: '"Data is empty"',
        } as { message: string });
      }

      return res;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "teachers/add",
  async (id: string | null, thunkAPI) => {
    const { user } = thunkAPI.getState() as UserToken;

    try {
      const data = await fetch(`/api/teachers/favorites/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      const res = await data.json();
      if (data.status !== 200) throw new Error(res.message);

      return res;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const { message } = error;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const deleteFromFavorites = createAsyncThunk(
  "teachers/delete",
  async (id: string | null, thunkAPI) => {
    const { user } = thunkAPI.getState() as UserToken;

    try {
      const data = await fetch(`/api/teachers/favorites/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      const res = await data.json();
      if (data.status !== 200) throw new Error(res.message);

      return res;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const { message } = error;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getFavorites = createAsyncThunk(
  "favorites/get",
  async (_, thunkAPI) => {
    const { user } = thunkAPI.getState() as UserToken;

    try {
      const data = await fetch(`/api/teachers/favorites`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });
      const res = await data.json();
      if (data.status !== 200) throw new Error(res.message);

      return res;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const { message } = error;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const bookLesson = createAsyncThunk(
  "lesson/book",
  async ({ id, book }: BookParams, thunkAPI) => {
    const { user } = thunkAPI.getState() as UserToken;

    try {
      const data = await fetch(`/api/teachers/${id}`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + user.token,
        },
        body: JSON.stringify(book),
      });

      const res = await data.json();
      if (data.status !== 201) throw new Error(res.message);

      return res;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const { message } = error;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
