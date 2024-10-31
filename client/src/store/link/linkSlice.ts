import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkState, NewLink, Platform } from "../../types/link";
import { getLinks, saveLinks } from "./linkOperations";
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
    deleteLinkLocally: (state, { payload }: PayloadAction<string>) => {
      state.links = state.links.filter((link) => link._id !== payload);

      const updateLinksIndex = state.links.map((link, index) => {
        return {
          ...link,
          index,
        };
      });

      state.links = updateLinksIndex;
    },
    addNewLink: (state, { payload }: PayloadAction<NewLink>) => {
      state.links.push(payload);
    },
    updateLink: (
      state,
      {
        payload,
      }: PayloadAction<{ id: string; url?: string; platform?: Platform }>
    ) => {
      const { id, platform, url } = payload;
      const link = state.links.find((link) => link._id === id);

      if (link) {
        if (platform) link.platform = platform;
        if (url !== undefined) link.url = url;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLinks.fulfilled, (state, { payload }) => {
        state.links = payload;
      })
      .addCase(saveLinks.fulfilled, (state, { payload }) => {
        state.links = payload.links;
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
export const { deleteLinkLocally, addNewLink, updateLink } = linkSlice.actions;
