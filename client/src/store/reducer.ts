import { combineReducers } from "@reduxjs/toolkit";

import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const reducer = combineReducers({});

export type RootState = ReturnType<typeof reducer>;
