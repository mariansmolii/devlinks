import { arrayMove } from "@dnd-kit/sortable";
import { getLinks, saveLinks } from "./linkOperations";
import { Link, LinkState, Platform } from "../../types/link";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleFulfilled, handlePending, handleRejected } from "../handlers";

const initialState: LinkState = {
  links: [],
  deletedLinkIds: [],
  isLoading: false,
  error: null,
};

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    addNewLink: (state, { payload }: PayloadAction<Link>) => {
      state.links.push(payload);
    },
    removeLinkLocal: (state, { payload }: PayloadAction<string>) => {
      state.links = state.links.filter((link) => link._id !== payload);

      state.links = state.links.map((link, index) => ({
        ...link,
        index,
      }));
    },
    updateLink: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
        field: keyof Link;
        value: Platform | string;
      }>
    ) => {
      const { id, field, value } = payload;

      const linkToUpdate = state.links.find((link) => link._id === id);

      if (linkToUpdate) {
        (linkToUpdate[field] as typeof value) = value;
      }
    },
    reorderLinks: (
      state,
      { payload }: PayloadAction<{ oldIndex: number; newIndex: number }>
    ) => {
      const { oldIndex, newIndex } = payload;

      state.links = arrayMove(state.links, oldIndex, newIndex);

      state.links = state.links.map((link, index) => ({
        ...link,
        index,
      }));
    },
    addDeletedLinkId: (state, { payload }: PayloadAction<string>) => {
      state.deletedLinkIds.push(payload);
    },
    clearDeletedLinkIds: (state) => {
      state.deletedLinkIds = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLinks.fulfilled, (state, { payload }) => {
        state.links = payload.sort((a, b) => a.index - b.index);
      })
      .addCase(saveLinks.fulfilled, (state, { payload }) => {
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

export const linkReducer = linkSlice.reducer;
export const {
  addNewLink,
  removeLinkLocal,
  updateLink,
  reorderLinks,
  addDeletedLinkId,
  clearDeletedLinkIds,
} = linkSlice.actions;
