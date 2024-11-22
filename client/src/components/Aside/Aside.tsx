import styles from "./Aside.module.scss";
import PreviewLinkList from "../PreviewLinkList/PreviewLinkList";
import PhonePreviewIcon from "../ui/PhonePreviewIcon/PhonePreviewIcon";

const Aside = () => {
  return (
    <aside className={styles.aside}>
      <div className={styles.circle} />

      <div className={styles.infoWrapper}>
        <div />
        <div />
      </div>

      <PhonePreviewIcon />

      <PreviewLinkList />
    </aside>
  );
};

export default Aside;
