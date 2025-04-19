import useLink from "../../hooks/useLink";
import styles from "./PreviewPage.module.scss";
import useProfile from "../../hooks/useProfile";
import PreviewLinkList from "../../components/PreviewLinkList/PreviewLinkList";
import ProfileDataPreview from "../../components/ProfileDataPreview/ProfileDataPreview";

const PreviewPage = () => {
  const { links } = useLink();
  const {
    personalDetails: { firstName, lastName, profileEmail },
  } = useProfile();

  return (
    <>
      <div className={styles.background} />

      <div className={styles.wrapper}>
        <ProfileDataPreview
          firstName={firstName}
          lastName={lastName}
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

export default PreviewPage;
