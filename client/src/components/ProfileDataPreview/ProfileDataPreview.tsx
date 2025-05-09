import clsx from "clsx";
import useShare from "../../hooks/useShare";
import useProfile from "../../hooks/useProfile";
import styles from "./ProfileDataPreview.module.scss";

import { useLocation, useParams } from "react-router-dom";

interface ProfileDataPreviewProps {
  className?: string;
  firstName: string;
  lastName: string;
  profileEmail: string;
}

const ProfileDataPreview = ({
  className,
  firstName,
  lastName,
  profileEmail,
}: ProfileDataPreviewProps) => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const { profileImage } = useShare();

  const {
    profileImage: { previewImage, savedImage },
  } = useProfile();

  const fullname = `${firstName} ${lastName}`;

  const isPages = ["/preview", `/share/${id}`].includes(pathname);
  const imageToShow =
    pathname === `/share/${id}` ? profileImage : previewImage || savedImage;

  return (
    <>
      {imageToShow ? (
        <img
          src={imageToShow as string}
          alt="user profile image"
          className={clsx(
            styles.profileImage,
            isPages && styles.isPages,
            className
          )}
        />
      ) : (
        <div
          className={clsx(styles.imagePlaceholder, isPages && styles.isPages)}
        />
      )}

      <ul className={clsx(styles.profileData, isPages && styles.isPages)}>
        <li className={clsx(styles.name)}>{fullname}</li>
        <li
          className={clsx(
            styles.email,
            !fullname.trim() && !isPages && styles.hasNoName
          )}
        >
          {profileEmail}
        </li>
      </ul>
    </>
  );
};

export default ProfileDataPreview;
