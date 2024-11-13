export interface User {
  _id: string;
  email: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends AuthCredentials {
  confirmPassword: string;
}

export interface RegisterResponse {
  user: Pick<User, "email">;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export type CurrentUserResponse = LoginResponse;

export interface Err {
  message: string;
}

export interface AuthState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  error: Err | null;
}
