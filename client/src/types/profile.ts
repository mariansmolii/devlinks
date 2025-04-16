import { Err } from "./auth";

export interface ProfileResponse extends PersonalDetails {
  profileImage?: string;
}

export interface ProfileImageResponse {
  image: string;
}

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  profileEmail?: string;
}

export interface ProfileImage {
  previewImage: string | null;
  savedImage: File | null | string;
}

export interface ProfileState {
  formData: {
    personalDetails: PersonalDetails;
    profileImage: ProfileImage;
  };
  isLoading: boolean;
  error: Err | null;
}
