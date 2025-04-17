import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services/axiosHeader";
import { ShareResponse } from "../../types/share";
import { Err } from "../../types/auth";
import handleAxiosError from "../../utils/helpers/handleAxiosError";

export const getSharedData = createAsyncThunk<
  ShareResponse,
  string,
  { rejectValue: Err }
>("share/getSharedData", async (owner, { rejectWithValue }) => {
  try {
    const { data } = await instance.get<ShareResponse>(`api/share/${owner}`);

    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError<Err>(error));
  }
});
