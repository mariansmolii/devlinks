import styles from "./PreviewPage.module.scss";
import useProfile from "../../hooks/useProfile";
import PreviewLinkList from "../../components/PreviewLinkList/PreviewLinkList";
import ProfileDataPreview from "../../components/ProfileDataPreview/ProfileDataPreview";

const PreviewPage = () => {
  const {
    profileImage: { previewImage, savedImage },
  } = useProfile();

  return (
    <>
      <div className={styles.background} />

      <div className={styles.wrapper}>
        {savedImage || previewImage ? (
          <img
            src={(previewImage || savedImage) as string}
            alt="user profile image"
            className={styles.img}
          />
        ) : (
          <div />
        )}

        <ProfileDataPreview showImage={false} />
        <PreviewLinkList className={styles.links} showAll={true} />
      </div>
    </>
  );
};

export default PreviewPage;
