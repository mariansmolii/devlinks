import { Link, useLocation } from "react-router-dom";

import clsx from "clsx";
import AuthLogo from "../Logo/Logo";
import Icon from "../Icon/Icon";
import Navigation from "../Navigation/Navigation";
import PreviewNavigation from "../Navigation/PreviewNavigation/PreviewNavigation";
import styles from "./Header.module.scss";

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
