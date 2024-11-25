import clsx from "clsx";
import Icon from "../ui/Icon/Icon";
import useProfile from "../../hooks/useProfile";
import styles from "./ImageUploader.module.scss";

import { ChangeEvent } from "react";

interface ImageUploaderProps {
  id: string;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageUploader = ({ id, handleImageChange }: ImageUploaderProps) => {
  const {
    profileImage: { previewImage, savedImage },
  } = useProfile();

  return (
    <div className={styles.uploader}>
      {previewImage || savedImage ? (
        <>
          <img src={(previewImage || savedImage) as string} alt="user photo" />

          <div
            className={clsx(styles.icon, {
              [styles.isImage]: !!previewImage || !!savedImage,
            })}
          >
            <Icon iconName="icon-upload-image" w={40} />
            <p>Change Image</p>
          </div>
        </>
      ) : (
        <div className={styles.icon}>
          <Icon iconName="icon-upload-image" w={40} />
          <p>+ Upload Image</p>
        </div>
      )}

      <input
        id={id}
        name="profileImagePreview"
        type="file"
        accept="image/png, image/jpeg"
        onChange={(e) => {
          handleImageChange(e);
        }}
      />
    </div>
  );
};

export default ImageUploader;
