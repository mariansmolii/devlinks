import clsx from "clsx";
import Icon from "../ui/Icon/Icon";
import styles from "./Navigation.module.scss";
import navLinks from "../../utils/data/navLinks";

import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul className={styles.nav}>
        {navLinks.map(({ title, path, icon }) => (
          <li key={title}>
            <NavLink
              to={path}
              className={({ isActive }) => clsx({ [styles.active]: isActive })}
            >
              <Icon iconName={icon} w={20} />
              <p>{title}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
