import { Triangle } from "react-loader-spinner";
import styles from "./PageLoader.module.scss";

const PageLoader = () => (
  <div className={styles.pageLoader}>
    <Triangle
      visible={true}
      height="100"
      width="100"
      color="#633cff"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass={styles.loaderWrapper}
    />
  </div>
);

export default PageLoader;
