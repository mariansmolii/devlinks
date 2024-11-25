import { ProfileState } from "../../types/profile";

export const selectProfileDetails = (state: { profile: ProfileState }) =>
  state.profile.formData.personalDetails;

export const selectProfileImage = (state: { profile: ProfileState }) =>
  state.profile.formData.profileImage;
