import { AuthState, Err, LoginResponse } from "../types/auth";

export const handleFulfilled = (state: AuthState) => {
  state.isLoading = false;
  state.error = null;
};

export const handlePending = (state: AuthState) => {
  state.isLoading = true;
  state.error = null;
};

export const handleRejected = (
  state: AuthState,
  { payload }: { payload: Err }
) => {
  state.isLoading = false;
  state.error = payload;
};

export const handleUserData = (
  state: AuthState,
  { payload }: { payload: LoginResponse }
) => {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoggedIn = true;
};
