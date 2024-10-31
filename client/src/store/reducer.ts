import { AuthState } from "../types/auth";
import { linkReducer } from "./link/linkSlice";
import { authReducer } from "./auth/authSlice";
import { combineReducers } from "@reduxjs/toolkit";

import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const persistedReducer = persistReducer<AuthState>(persistConfig, authReducer);

export const reducer = combineReducers({
  auth: persistedReducer,
  link: linkReducer,
});

export type RootState = ReturnType<typeof reducer>;
