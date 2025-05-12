import { createSlice } from "@reduxjs/toolkit";
import { ShareState } from "../../types/share";
import { handleFulfilled, handlePending, handleRejected } from "../handlers";
import { getSharedData } from "./shareOperations";

const initialState: ShareState = {
  firstName: "",
  lastName: "",
  profileEmail: "",
  profileImage: null,
  links: [],
  isLoading: false,
  error: null,
};

const shareSlice = createSlice({
  name: "share",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSharedData.fulfilled, (state, { payload }) => {
        state.firstName = payload.firstName;
        state.lastName = payload.lastName;
        state.profileEmail = payload.profileEmail;
        state.profileImage = payload.profileImage;
        state.links = payload.links.sort((a, b) => a.index - b.index);
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

export const shareReducer = shareSlice.reducer;
