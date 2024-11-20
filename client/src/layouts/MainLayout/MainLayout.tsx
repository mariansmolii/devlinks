import Aside from "../../components/Aside/Aside";
import Header from "../../components/Header/Header";
import Container from "../../components/Container/Container";
import styles from "./MainLayout.module.scss";

import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const { pathname } = useLocation();

  const showAside = ["/", "/profile"].includes(pathname);

  return (
    <>
      <Header />

      <main className={styles.main}>
        <Container className={styles.container}>
          {showAside && <Aside />}

          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default MainLayout;
