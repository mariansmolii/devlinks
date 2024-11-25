import { Err } from "./auth";

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  profileEmail?: string;
}

export interface ProfileImage {
  previewImage: string | null;
  savedImage: File | null;
}

export interface ProfileState {
  formData: {
    personalDetails: PersonalDetails;
    profileImage: ProfileImage;
  };
  isLoading: boolean;
  error: Err | null;
}
