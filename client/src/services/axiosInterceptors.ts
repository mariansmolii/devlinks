import instance from "./axiosHeader";

import { store } from "../store/store";
import { resetStore } from "../store/auth/authSlice";

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      try {
        store.dispatch(resetStore());
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }

    return Promise.reject(error);
  }
);
