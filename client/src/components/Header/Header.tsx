import HeaderContent from "./HeaderContent";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderContent />
    </header>
  );
};

export default Header;
