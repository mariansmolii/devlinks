import { AuthState } from "../types/auth";
import { authReducer } from "./auth/authSlice";
import { linkReducer } from "./link/linkSlice";
import { shareReducer } from "./share/shareSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { profileReducer } from "./profile/profileSlice";

import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const persistedReducer = persistReducer<AuthState>(persistConfig, authReducer);

export const reducer = combineReducers({
  auth: persistedReducer,
  link: linkReducer,
  profile: profileReducer,
  share: shareReducer,
});

export type RootState = ReturnType<typeof reducer>;
