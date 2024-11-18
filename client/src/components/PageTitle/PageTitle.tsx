import styles from "./PageTitle.module.scss";

interface PageTitleProps {
  title: string;
  subtitle: string;
}

const PageTitle = ({ title, subtitle }: PageTitleProps) => (
  <div className={styles.wrapper}>
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </div>
);

export default PageTitle;
