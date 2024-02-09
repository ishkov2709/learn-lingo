import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { currentUser, loginUser, logoutUser, registerUser } from "./thunk";
import { initialState } from "./initialState";
import {
  loginUserFulfilled,
  logoutUserFulfilled,
  registerUserFulfilled,
  userPending,
  userRejected,
} from "./operations";

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
      .addCase(registerUser.fulfilled, registerUserFulfilled)
      .addCase(logoutUser.fulfilled, logoutUserFulfilled)
      .addMatcher(
        isAnyOf(registerUser.pending, loginUser.pending, currentUser.pending),
        userPending
      )
      .addMatcher(
        isAnyOf(loginUser.fulfilled, currentUser.fulfilled),
        loginUserFulfilled
      )
      .addMatcher(
        isAnyOf(registerUser.rejected, loginUser.rejected),
        userRejected
      ),
});

export const userReducer = userSlice.reducer;

export const { resetStates } = userSlice.actions;
