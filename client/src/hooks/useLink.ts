import { useAppSelector } from "./useRedux";
import {
  selectDeletedLinkIds,
  selectError,
  selectIsLoading,
  selectLinks,
} from "../store/link/linkSelectors";

const useLink = () => {
  const links = useAppSelector(selectLinks);
  const deletedLinkIds = useAppSelector(selectDeletedLinkIds);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  return { links, deletedLinkIds, isLoading, error };
};

export default useLink;
