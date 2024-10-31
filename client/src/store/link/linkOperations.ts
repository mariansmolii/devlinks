import { AxiosResponse } from "axios";
import { AuthState, Error } from "../../types/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../../services/axiosHeader";
import { DeleteResponse, Link, LinkResponse, NewLink } from "../../types/link";

import instance from "../../services/axiosInstance";

export const getLinks = createAsyncThunk<
  Link[],
  void,
  { rejectValue: Error; state: { auth: AuthState } }
>("links/getAllLinks", async (_, { rejectWithValue, getState }) => {
  const state = getState();
  const persistedToken = state.auth.token;

  try {
    if (persistedToken) {
      setAuthHeader(persistedToken);
    }

    const { data }: AxiosResponse<Link[]> = await instance.get("/api/links/");

    return data;
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export const saveLinks = createAsyncThunk<
  LinkResponse,
  Link[] | NewLink[],
  { state: { auth: AuthState }; rejectValue: Error }
>("links/saveLinks", async (links, { rejectWithValue, getState }) => {
  const state = getState();
  const persistedToken = state.auth.token;

  try {
    if (persistedToken) {
      setAuthHeader(persistedToken);
    }

    const { data }: AxiosResponse<LinkResponse> = await instance.patch(
      "/api/links/",
      {
        links,
      }
    );

    return data;
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});

export const deleteLink = createAsyncThunk<
  DeleteResponse,
  { _id: string },
  { state: { auth: AuthState }; rejectValue: Error }
>("links/deleteLink", async ({ _id }, { rejectWithValue, getState }) => {
  const state = getState();
  const persistedToken = state.auth.token;

  try {
    if (persistedToken) {
      setAuthHeader(persistedToken);
    }

    const { data }: AxiosResponse<DeleteResponse> = await instance.delete(
      `/api/links/${_id}`
    );

    return data;
  } catch (error) {
    return rejectWithValue(error as Error);
  }
});
