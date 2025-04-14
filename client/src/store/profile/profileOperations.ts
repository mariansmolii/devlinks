import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader } from "../../services/axiosInstance";
import instance from "../../services/axiosHeader";
import handleAxiosError from "../../utils/helpers/handleAxiosError";
import { AuthState, Err } from "../../types/auth";
import { PersonalDetails, ProfileResponse } from "../../types/profile";

export const getProfileInfo = createAsyncThunk<
  ProfileResponse,
  void,
  {
    state: { auth: AuthState };
    rejectValue: Err;
  }
>("profile/getProfileInfo", async (_, { rejectWithValue, getState }) => {
  const state = getState();
  const persistedToken = state.auth.token;

  try {
    if (persistedToken) {
      setAuthHeader(persistedToken);
    }

    const { data } = await instance.get<ProfileResponse>("/api/profile");

    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError<Err>(error));
  }
});

export const updateProfileInfo = createAsyncThunk<
  PersonalDetails,
  PersonalDetails,
  {
    state: { auth: AuthState };
    rejectValue: Err;
  }
>(
  "profile/updateProfileInfo",
  async (profileData, { rejectWithValue, getState }) => {
    const state = getState();
    const persistedToken = state.auth.token;

    try {
      if (persistedToken) {
        setAuthHeader(persistedToken);
      }

      const { data } = await instance.patch<PersonalDetails>(
        "/api/profile/update",
        profileData
      );

      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError<Err>(error));
    }
  }
);
