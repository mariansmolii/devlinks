import { useAppSelector } from "./useRedux";
import {
  selectProfileDetails,
  selectProfileImage,
} from "../store/profile/profileSelector";

const useProfile = () => {
  const personalDetails = useAppSelector(selectProfileDetails);
  const profileImage = useAppSelector(selectProfileImage);

  return { personalDetails, profileImage };
};

export default useProfile;
