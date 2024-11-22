import instance from "../../services/axiosHeader";
import handleAxiosError from "../../utils/helpers/handleAxiosError";

import {
  FormValues,
  LinkIds,
  LinkRemoveResponse,
  LinkResponse,
  NewLink,
} from "../../types/link";
import { AuthState, Err } from "../../types/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../../services/axiosInstance";

export const getLinks = createAsyncThunk<
  LinkResponse[],
  void,
  { state: { auth: AuthState }; rejectValue: Err }
>("link/getLinks", async (_, { rejectWithValue, getState }) => {
  const state = getState();
  const persistedToken = state.auth.token;

  try {
    if (persistedToken) {
      setAuthHeader(persistedToken);
    }

    const { data } = await instance.get<LinkResponse[]>("/api/link");

    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError<Err>(error));
  }
});

export const saveLinks = createAsyncThunk<
  FormValues,
  FormValues | NewLink,
  {
    state: { auth: AuthState };
    rejectValue: Err;
  }
>("link/saveLinks", async ({ links }, { rejectWithValue, getState }) => {
  const state = getState();
  const persistedToken = state.auth.token;

  try {
    if (persistedToken) {
      setAuthHeader(persistedToken);
    }

    const { data } = await instance.patch<FormValues>("/api/link/save", {
      links,
    });

    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError<Err>(error));
  }
});

export const removeLink = createAsyncThunk<
  LinkRemoveResponse,
  LinkIds,
  { state: { auth: AuthState }; rejectValue: Err }
>("link/removeLink", async ({ linkIds }, { rejectWithValue, getState }) => {
  const state = getState();
  const persistedToken = state.auth.token;

  try {
    if (persistedToken) {
      setAuthHeader(persistedToken);
    }

    const { data } = await instance.delete<LinkRemoveResponse>(
      "/api/link/remove",
      {
        data: { linkIds },
      }
    );

    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError<Err>(error));
  }
});
