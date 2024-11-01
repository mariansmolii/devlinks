import { Outlet, useLocation } from "react-router-dom";

import styles from "./MainLayout.module.scss";
import Header from "../../components/Header/Header";
import useScreenSize from "../../hooks/useScreenSize";
import Container from "../../components/Container/Container";
import Aside from "../../components/Aside/Aside";

const MainLayout = () => {
  const { pathname } = useLocation();
  const { width } = useScreenSize();

  const showAside = ["/", "/profile"].includes(pathname) && width >= 1440;

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
