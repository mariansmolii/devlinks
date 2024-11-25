import { createSlice } from "@reduxjs/toolkit";
import { PersonalDetails, ProfileState } from "../../types/profile";

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
  },
});

export const profileReducer = profileSlice.reducer;
export const { setFormData, setProfileImagePreview } = profileSlice.actions;
