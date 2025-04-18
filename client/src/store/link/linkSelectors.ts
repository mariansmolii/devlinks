import { LinkState } from "../../types/link";

export const selectLinks = (state: { link: LinkState }) => state.link.links;

export const selectDeletedLinkIds = (state: { link: LinkState }) =>
  state.link.deletedLinkIds;

export const selectIsLoading = (state: { link: LinkState }) =>
  state.link.isLoading;

export const selectError = (state: { link: LinkState }) => state.link.error;
