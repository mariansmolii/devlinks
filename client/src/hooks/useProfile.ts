import { useAppSelector } from "./useRedux";
import {
  selectError,
  selectIsLoading,
  selectProfileDetails,
  selectProfileImage,
} from "../store/profile/profileSelector";

const useProfile = () => {
  const personalDetails = useAppSelector(selectProfileDetails);
  const profileImage = useAppSelector(selectProfileImage);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  return { personalDetails, profileImage, isLoading, error };
};

export default useProfile;
