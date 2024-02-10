import { PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "./initialState";
import { RegisterValues } from "@/components/register-form/register-form";
import { deleteCookie, setCookie } from "cookies-next";

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

export const userPending = (state: InitialState) => {
  state.error = null;
  state.success = null;
  state.isLoading = true;
};

export const registerUserFulfilled = (
  state: InitialState,
  { payload }: PayloadAction<Partial<RegisterValues>>
) => {
  state.success = true;
  state.isLoading = false;
  state.email = payload.email;
};

export const userRejected = (
  state: InitialState,
  { payload }: PayloadAction<string | null | unknown>
) => {
  state.error = payload;
  state.isLoading = false;
};

export const loginUserFulfilled = (
  state: InitialState,
  { payload }: PayloadAction<LoginResponse>
) => {
  state.isLoading = false;
  state.token = payload.token;
  state.id = payload.user.id;
  state.email = payload.user.email;
  state.name = payload.user.name;
  state.isRefreshing = true;

  setAuthCookie(payload.token, "user-token");
};

export const logoutUserFulfilled = (state: InitialState) => {
  state.token = null;
  state.id = null;
  state.email = "";
  state.name = null;

  deleteCookie("user-token");
};
