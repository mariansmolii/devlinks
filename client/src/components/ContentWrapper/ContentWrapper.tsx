import clsx from "clsx";
import styles from "./ContentWrapper.module.scss";

import { ReactNode } from "react";

interface ContentWrapperProps {
  children: ReactNode;
  className?: string;
}

const ContentWrapper = ({ children, className }: ContentWrapperProps) => (
  <div className={clsx(styles.wrapper, className)}>{children}</div>
);

export default ContentWrapper;
