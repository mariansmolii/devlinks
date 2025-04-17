import { Err } from "./auth";
import { Link } from "./link";
import { PersonalDetails } from "./profile";

export interface ShareState extends PersonalDetails {
  profileImage: string | null;
  links: Link[];
  isLoading: boolean;
  error: Err | null;
}

export interface ShareResponse extends PersonalDetails {
  links: Link[];
  profileImage: string | null;
}
