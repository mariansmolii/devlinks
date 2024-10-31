import {
  AuthResponse,
  AuthState,
  Error,
  RegisterResponse,
} from "../types/auth";
import { LinkState } from "../types/link";

export const handleFulfilled = (state: AuthState | LinkState) => {
  state.isLoading = false;
  state.error = null;
};

export const handlePending = (state: AuthState | LinkState) => {
  state.isLoading = true;
  state.error = null;
};

export const handleRejected = (
  state: AuthState | LinkState,
  { payload }: { payload: Error }
) => {
  state.isLoading = false;
  state.error = payload;
};

export const handleUserData = (
  state: AuthState,
  { payload }: { payload: AuthResponse }
) => {
  state.user.email = payload.user.email;
  state.user.id = payload.user._id;
  state.token = payload.token;
  state.isLoggedIn = true;
};

export const handleRegisterData = (
  state: AuthState,
  { payload }: { payload: RegisterResponse }
) => {
  state.user.email = payload.user.email;
};
