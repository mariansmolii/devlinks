import { Err } from "./auth";

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

export interface NewLink {
  links: Omit<Link, "_id">[];
}

export interface FormValues {
  links: Link[];
}

export interface LinkState {
  links: Link[];
  isLoading: boolean;
  error: Err | null;
}

export interface LinkResponse extends Link {
  owner: string;
}

export interface LinkRemoveResponse {
  message: string;
}

export interface LinkIds {
  linkIds: string[];
}
