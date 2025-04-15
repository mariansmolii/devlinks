import useProfile from "../../hooks/useProfile";
import styles from "./ProfileDataPreview.module.scss";

const ProfileDataPreview = () => {
  const {
    profileImage: { previewImage, savedImage },
    personalDetails: { firstName, lastName, profileEmail },
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

      <ul className={styles.profileData}>
        <li className={styles.name}>{firstName + " " + lastName}</li>
        <li className={styles.email}>{profileEmail}</li>
      </ul>
    </>
  );
};

export default ProfileDataPreview;
