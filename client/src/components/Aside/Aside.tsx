import styles from "./Aside.module.scss";
import useLink from "../../hooks/useLink";
import useProfile from "../../hooks/useProfile";
import PreviewLinkList from "../PreviewLinkList/PreviewLinkList";
import PhonePreviewIcon from "../ui/PhonePreviewIcon/PhonePreviewIcon";
import ProfileDataPreview from "../ProfileDataPreview/ProfileDataPreview";

const Aside = () => {
  const { links } = useLink();
  const {
    personalDetails: { firstName, lastName, profileEmail },
  } = useProfile();

  return (
    <aside className={styles.aside}>
      <ProfileDataPreview
        firstName={firstName}
        lastName={lastName}
        profileEmail={profileEmail ?? ""}
      />

      <PhonePreviewIcon />

      <PreviewLinkList links={links} />
    </aside>
  );
};

export default Aside;
