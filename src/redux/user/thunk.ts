import { RegisterValues } from "@/components/register-form/register-form";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "user/register",
  async (user: RegisterValues, thunkAPI) => {
    try {
      const data = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res = await data.json();
      if (data.status !== 201) throw thunkAPI.rejectWithValue(res.message);

      return res;
    } catch (error: unknown) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
