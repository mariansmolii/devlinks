import { Link } from "react-router-dom";
import { Error } from "./auth";

export interface Platform {
  value: string;
  label: string;
  iconName: string;
  color: string;
}

export interface Link {
  _id: string;
  platform: Platform;
  index: number;
  url: string;
}

export interface NewLink extends Link {
  type: string;
}

export interface LinkState {
  links: Link[] | NewLink[];
  isLoading: boolean;
  error: null | string | Error;
}

export interface ErrorState {
  [key: string]: { isError: boolean; message: string };
}

export interface LinkResponse {
  links: Link[];
}

export interface DeleteResponse {
  message: string;
}
