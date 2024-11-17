import Icon from "../ui/Icon/Icon";
import styles from "./Aside.module.scss";
import PreviewLinkList from "../PreviewLinkList/PreviewLinkList";

const Aside = () => {
  return (
    <aside className={styles.aside}>
      <div className={styles.circle} />

      <div className={styles.infoWrapper}>
        <div />
        <div />
      </div>

      <Icon iconName="icon-illustration-phone-mockup" w={307} h={631} />

      <PreviewLinkList />
    </aside>
  );
};

export default Aside;
