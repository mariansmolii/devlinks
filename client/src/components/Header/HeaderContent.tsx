import clsx from "clsx";
import Icon from "../ui/Icon/Icon";
import Logo from "../ui/Logo/Logo";
import styles from "./Header.module.scss";
import Navigation from "../Navigation/Navigation";
import PreviewNavigation from "../PreviewNavigation/PreviewNavigation";

import { Link, useLocation } from "react-router-dom";

const HeaderContent = () => {
  const location = useLocation();
  const isPreviewPage = location.pathname === "/preview";

  return !isPreviewPage ? (
    <>
      <Link to="/">
        <Logo />
      </Link>

      <Navigation />

      <Link
        to="/preview"
        state={{ from: location }}
        className={clsx(styles.navLink)}
      >
        <Icon iconName="icon-preview" w={20} />
        <p>Preview</p>
      </Link>
    </>
  ) : (
    <PreviewNavigation />
  );
};

export default HeaderContent;
