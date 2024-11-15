import { AuthState } from "../../types/auth";
import { createSlice } from "@reduxjs/toolkit";
import { currentUser, login, logOut, register } from "./authOperations";
import {
  handleFulfilled,
  handlePending,
  handleRejected,
  handleUserData,
} from "../handlers";

const initialState: AuthState = {
  user: {
    _id: "",
    email: "",
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetStore: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, { payload }) => {
        state.user.email = payload.user.email;
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, handleUserData)
      .addCase(logOut.fulfilled, () => initialState)
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        state.isRefreshing = false;
        handleUserData(state, { payload });
      })
      .addCase(currentUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(currentUser.rejected, (state) => {
        state.isRefreshing = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        handleFulfilled
      )
      .addMatcher((action) => action.type.endsWith("/pending"), handlePending)
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        handleRejected
      );
  },
});

export const authReducer = authSlice.reducer;
export const { resetStore } = authSlice.actions;
