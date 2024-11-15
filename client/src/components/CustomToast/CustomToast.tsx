import Icon from "../Icon/Icon";
import styles from "./CustomToast.module.scss";

import { Toast } from "react-hot-toast";

interface CustomToastProps {
  text: string;
  icon: string;
  t: Toast;
}

const CustomToast = (t: CustomToastProps) => (
  <div className={styles.toast}>
    <div>
      <Icon iconName={t.icon} w={20} />
      <p>{t.text}</p>
    </div>
  </div>
);

export default CustomToast;
