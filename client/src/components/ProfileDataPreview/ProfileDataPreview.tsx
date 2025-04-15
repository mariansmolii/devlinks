import useProfile from "../../hooks/useProfile";
import styles from "./ProfileDataPreview.module.scss";

const ProfileDataPreview = () => {
  const {
    profileImage: { previewImage, savedImage },
  } = useProfile();

  return (
    <>
      {(previewImage || savedImage) && (
        <img
          src={(previewImage || savedImage) as string}
          alt="user profile image"
          className={styles.profileImage}
        />
      )}
    </>
  );
};

export default ProfileDataPreview;
