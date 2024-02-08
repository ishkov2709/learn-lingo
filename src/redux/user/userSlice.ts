import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./thunk";
import { initialState } from "./initialState";
import { RegisterValues } from "@/components/register-form/register-form";

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
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
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      }),
});

export const userReducer = userSlice.reducer;
