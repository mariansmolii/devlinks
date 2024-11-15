import HeaderContent from "./HeaderContent";
import Container from "../Container/Container";
import useScreenSize from "../../hooks/useScreenSize";
import styles from "./Header.module.scss";

const Header = () => {
  const { width } = useScreenSize();

  return width < 768 ? (
    <header className={styles.header}>
      <HeaderContent />
    </header>
  ) : (
    <Container className={styles.container}>
      <header className={styles.header}>
        <HeaderContent />
      </header>
    </Container>
  );
};

export default Header;
