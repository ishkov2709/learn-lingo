import { LoginValues } from "@/components/login-form/login-form";
import { RegisterValues } from "@/components/register-form/register-form";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Error } from "mongoose";

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
      if (data.status !== 201) throw new Error(res.message);

      return res;
    } catch (error: unknown) {
      if (error instanceof Error) {
        const { message }: { message: string } = error;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (user: LoginValues, thunkAPI) => {
    try {
      const data = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "applicatios/json",
        },
        body: JSON.stringify(user),
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
