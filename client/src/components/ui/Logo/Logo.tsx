import clsx from "clsx";
import Icon from "../Icon/Icon";
import styles from "./Logo.module.scss";

import { useLocation } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  const { pathname } = useLocation();

  const isAuth = pathname === "/login" || pathname === "/registration";

  return (
    <div className={clsx(styles.logo, { [styles.isAuth]: isAuth }, className)}>
      <Icon iconName="icon-logo" w={33} />
      <p className={clsx({ [styles.isNotAuth]: !isAuth })}>devlinks</p>
    </div>
  );
};

export default Logo;
