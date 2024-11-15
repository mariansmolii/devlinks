import instance from "../../services/axiosHeader";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Err,
  AuthCredentials,
  RegisterResponse,
  LoginResponse,
  CurrentUserResponse,
  AuthState,
} from "../../types/auth";
import { isAxiosError } from "axios";
import { clearAuthHeader, setAuthHeader } from "../../services/axiosInstance";

export const register = createAsyncThunk<
  RegisterResponse,
  AuthCredentials,
  {
    rejectValue: Err;
  }
>("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await instance.post<RegisterResponse>(
      "/api/auth/register",
      credentials
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error?.response?.data);
    }

    return rejectWithValue({ message: "An error occurred. Please try again." });
  }
});

export const login = createAsyncThunk<
  LoginResponse,
  AuthCredentials,
  {
    rejectValue: Err;
  }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await instance.post<LoginResponse>(
      "/api/auth/login",
      credentials
    );

    if (data.token) {
      setAuthHeader(data.token);
    }

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error?.response?.data);
    }

    return rejectWithValue({ message: "An error occurred. Please try again." });
  }
});

export const logOut = createAsyncThunk<
  void,
  void,
  {
    rejectValue: Err;
  }
>("auth/logOut", async (_, { rejectWithValue }) => {
  try {
    await instance.post("/api/auth/logout");
    clearAuthHeader();
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error?.response?.data);
    }

    return rejectWithValue({
      message: "An error occurred. Please try again.",
    });
  }
});

export const currentUser = createAsyncThunk<
  CurrentUserResponse,
  void,
  { state: { auth: AuthState }; rejectValue: Err }
>("auth/currentUser", async (_, { rejectWithValue, getState }) => {
  const state = getState();
  const persistedToken = state.auth.token;

  if (!persistedToken) {
    return rejectWithValue({ message: "No token found" });
  }

  try {
    setAuthHeader(persistedToken);

    const { data } = await instance.get<CurrentUserResponse>(
      "/api/auth/current"
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error?.response?.data);
    }

    return rejectWithValue({
      message: "An error occurred. Please try again.",
    });
  }
});
