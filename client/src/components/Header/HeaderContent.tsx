import { Link, useLocation } from "react-router-dom";

import clsx from "clsx";
import Icon from "../Icon/Icon";
import AuthLogo from "../Logo/Logo";
import styles from "./Header.module.scss";
import Navigation from "../Navigation/Navigation";
import PreviewNavigation from "../PreviewNavigation/PreviewNavigation";

const HeaderContent = () => {
  const location = useLocation();
  const isPreviewPage = location.pathname === "/preview";

  return !isPreviewPage ? (
    <>
      <Link to="/">
        <AuthLogo />
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
