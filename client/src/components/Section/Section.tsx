import clsx from "clsx";
import styles from "./Section.module.scss";

import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

const Section = ({ children, className }: SectionProps) => (
  <section className={clsx(styles.section, className)}>{children}</section>
);

export default Section;
