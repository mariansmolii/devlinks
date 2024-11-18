import { useAppSelector } from "./useRedux";
import {
  selectError,
  selectIsLoading,
  selectLinks,
} from "../store/link/linkSelectors";

const useLink = () => {
  const links = useAppSelector(selectLinks);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  return { links, isLoading, error };
};

export default useLink;
