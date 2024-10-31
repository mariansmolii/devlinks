import { Outlet } from "react-router-dom";

import styles from "./MainLayout.module.scss";
import Header from "../../components/Header/Header";
import Container from "../../components/Container/Container";

const MainLayout = () => {
  return (
    <>
      <Header />

      <main className={styles.main}>
        <Container className={styles.container}>
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default MainLayout;
