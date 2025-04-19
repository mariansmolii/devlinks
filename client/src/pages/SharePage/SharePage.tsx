import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useRedux";
import { getSharedData } from "../../store/share/shareOperations";

import useShare from "../../hooks/useShare";
import styles from "./SharePage.module.scss";
import PreviewLinkList from "../../components/PreviewLinkList/PreviewLinkList";
import ProfileDataPreview from "../../components/ProfileDataPreview/ProfileDataPreview";

const SharePage = () => {
  const { id: owner } = useParams();
  const { links, firstName, lastName, profileEmail } = useShare();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (owner) {
      dispatch(getSharedData(owner));
    }
  }, [dispatch, owner]);

  return (
    <>
      <div className={styles.background} />

      <div className={styles.wrapper}>
        <ProfileDataPreview
          firstName={firstName ?? ""}
          lastName={lastName ?? ""}
          profileEmail={profileEmail ?? ""}
        />

        <PreviewLinkList
          links={links}
          className={styles.links}
          showAll={true}
        />
      </div>
    </>
  );
};

export default SharePage;
