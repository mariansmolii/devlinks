import { ReactNode } from "react";

import clsx from "clsx";
import styles from "./ContentWrapper.module.scss";

interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
}

const ContentWrapper = ({ children, className }: ContentWrapperProps) => (
  <div className={clsx(styles.wrapper, className)}>{children}</div>
);

export default ContentWrapper;
