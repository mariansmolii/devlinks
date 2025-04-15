import styles from "./Aside.module.scss";
import PreviewLinkList from "../PreviewLinkList/PreviewLinkList";
import PhonePreviewIcon from "../ui/PhonePreviewIcon/PhonePreviewIcon";
import ProfileDataPreview from "../ProfileDataPreview/ProfileDataPreview";

const Aside = () => {
  return (
    <aside className={styles.aside}>
      <ProfileDataPreview />

      <PhonePreviewIcon />

      <PreviewLinkList />
    </aside>
  );
};

export default Aside;
