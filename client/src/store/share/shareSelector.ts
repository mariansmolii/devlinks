import { ShareState } from "../../types/share";

export const selectFirstName = (state: { share: ShareState }) =>
  state.share.firstName;
export const selectLastName = (state: { share: ShareState }) =>
  state.share.lastName;
export const selectEmail = (state: { share: ShareState }) =>
  state.share.profileEmail;
export const selectProfileImage = (state: { share: ShareState }) =>
  state.share.profileImage;
export const selectLinks = (state: { share: ShareState }) => state.share.links;
export const selectIsLoading = (state: { share: ShareState }) =>
  state.share.isLoading;
export const selectError = (state: { share: ShareState }) => state.share.error;
