import clsx from "clsx";
import styles from "./Container.module.scss";

import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => (
  <div className={clsx(styles.container, className)}>{children}</div>
);

export default Container;
