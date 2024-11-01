import Icon from "../Icon/Icon";
import styles from "./Aside.module.scss";
import LinksListPreview from "../LinksListPreview/LinksListPreview";

const Aside = () => {
  return (
    <aside className={styles.aside}>
      <div className={styles.circle} />

      <div className={styles.infoWrapper}>
        <div />

        <div />
      </div>

      <Icon iconName="icon-illustration-phone-mockup" w={307} h={631} />

      <LinksListPreview />
    </aside>
  );
};

export default Aside;
