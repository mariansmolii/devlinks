import { LinkState } from "../types/link";
import { AuthState, Err, LoginResponse } from "../types/auth";
import { ProfileState } from "../types/profile";

export const handleFulfilled = (
  state: AuthState | LinkState | ProfileState
) => {
  state.isLoading = false;
  state.error = null;
};

export const handlePending = (state: AuthState | LinkState | ProfileState) => {
  state.isLoading = true;
  state.error = null;
};

export const handleRejected = (
  state: AuthState | LinkState | ProfileState,
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
