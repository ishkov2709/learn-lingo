import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./thunk";
import { initialState } from "./initialState";
import { RegisterValues } from "@/components/register-form/register-form";
import { setCookie } from "cookies-next";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

const setAuthCookie = (token: string, name: string) => {
  setCookie(name, token, {
    path: "/",
  });
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    resetStates: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.success = null;
        state.isLoading = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, { payload }: PayloadAction<Partial<RegisterValues>>) => {
          state.success = true;
          state.isLoading = false;
          state.email = payload.email;
        }
      )
      .addCase(
        registerUser.rejected,
        (state, { payload }: PayloadAction<string | null | unknown>) => {
          state.error = payload;
          state.isLoading = false;
        }
      )
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.success = null;
        state.isLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, { payload }: PayloadAction<LoginResponse>) => {
          state.isLoading = false;
          state.token = payload.token;
          state.id = payload.user.id;
          state.email = payload.user.email;
          state.name = payload.user.name;
          state.success = true;

          setAuthCookie(payload.token, "user-token");
        }
      )
      .addCase(
        loginUser.rejected,
        (state, { payload }: PayloadAction<string | null | unknown>) => {
          state.error = payload;
        }
      ),
});

export const userReducer = userSlice.reducer;

export const { resetStates } = userSlice.actions;
