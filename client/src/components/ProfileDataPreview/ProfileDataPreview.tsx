import clsx from "clsx";
import useProfile from "../../hooks/useProfile";
import styles from "./ProfileDataPreview.module.scss";

interface ProfileDataPreviewProps {
  className?: string;
  showImage?: boolean;
}

const ProfileDataPreview = ({
  className,
  showImage = true,
}: ProfileDataPreviewProps) => {
  const {
    profileImage: { previewImage, savedImage },
    personalDetails: { firstName, lastName, profileEmail },
  } = useProfile();

  return (
    <>
      {showImage && (previewImage || savedImage) && (
        <img
          src={(previewImage || savedImage) as string}
          alt="user profile image"
          className={styles.profileImage}
        />
      )}

      <ul className={clsx(styles.profileData, className)}>
        <li className={styles.name}>{firstName + " " + lastName}</li>
        <li className={styles.email}>{profileEmail}</li>
      </ul>
    </>
  );
};

export default ProfileDataPreview;
