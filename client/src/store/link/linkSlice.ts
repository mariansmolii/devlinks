import { getLinks, saveLinks } from "./linkOperations";
import { Link, LinkState, Platform } from "../../types/link";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleFulfilled, handlePending, handleRejected } from "../handlers";

const initialState: LinkState = {
  links: [],
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
export const { addNewLink, removeLinkLocal, updateLink } = linkSlice.actions;