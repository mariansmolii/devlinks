import {
  selectEmail,
  selectError,
  selectFirstName,
  selectIsLoading,
  selectLastName,
  selectLinks,
  selectProfileImage,
} from "../store/share/shareSelector";
import { useAppSelector } from "./useRedux";

const useShare = () => {
  const firstName = useAppSelector(selectFirstName);
  const lastName = useAppSelector(selectLastName);
  const profileEmail = useAppSelector(selectEmail);
  const profileImage = useAppSelector(selectProfileImage);
  const links = useAppSelector(selectLinks);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  return {
    firstName,
    lastName,
    profileEmail,
    profileImage,
    links,
    isLoading,
    error,
  };
};

export default useShare;
