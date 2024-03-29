import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { currentUser, loginUser, logoutUser, registerUser } from "./thunk";
import { initialState } from "./initialState";
import {
  currentUserRejected,
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
    setRefreshing: (state) => {
      state.isRefreshing = true;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.fulfilled, registerUserFulfilled)
      .addCase(logoutUser.fulfilled, logoutUserFulfilled)
      .addCase(currentUser.rejected, currentUserRejected)
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

export const { resetStates, setRefreshing } = userSlice.actions;
