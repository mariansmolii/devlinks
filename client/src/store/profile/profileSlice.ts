import { createSlice } from "@reduxjs/toolkit";
import { PersonalDetails, ProfileState } from "../../types/profile";
import { handleFulfilled, handlePending, handleRejected } from "../handlers";
import {
  getProfileInfo,
  updateProfileImage,
  updateProfileInfo,
} from "./profileOperations";

const initialState: ProfileState = {
  formData: {
    personalDetails: {
      firstName: "",
      lastName: "",
      profileEmail: "",
    },
    profileImage: {
      previewImage: null,
      savedImage: null,
    },
  },
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setFormData: (state, { payload }: { payload: PersonalDetails }) => {
      state.formData.personalDetails = {
        ...state.formData.personalDetails,
        ...payload,
      };
    },
    setProfileImagePreview: (state, { payload }: { payload: string }) => {
      state.formData.profileImage.previewImage = payload;
    },
    clearProfileImagePreview: (state) => {
      state.formData.profileImage.previewImage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileInfo.fulfilled, (state, { payload }) => {
        state.formData.personalDetails = {
          ...state.formData.personalDetails,
          ...payload,
        };
      })
      .addCase(getProfileInfo.fulfilled, (state, { payload }) => {
        state.formData.personalDetails = {
          ...state.formData.personalDetails,
          ...payload,
        };
        state.formData.profileImage.savedImage = payload.profileImage ?? null;
      })
      .addCase(updateProfileImage.fulfilled, (state, { payload }) => {
        state.formData.profileImage.savedImage = payload.image;
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

export const profileReducer = profileSlice.reducer;
export const { setFormData, setProfileImagePreview, clearProfileImagePreview } =
  profileSlice.actions;
