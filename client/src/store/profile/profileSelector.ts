import { ProfileState } from "../../types/profile";

export const selectProfileDetails = (state: { profile: ProfileState }) =>
  state.profile.formData.personalDetails;

export const selectProfileImage = (state: { profile: ProfileState }) =>
  state.profile.formData.profileImage;

export const selectIsLoading = (state: { profile: ProfileState }) =>
  state.profile.isLoading;

export const selectError = (state: { profile: ProfileState }) =>
  state.profile.error;
