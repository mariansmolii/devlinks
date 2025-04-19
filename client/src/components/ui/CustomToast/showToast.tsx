import toast from "react-hot-toast";
import CustomToast from "./CustomToast";

const showToast = (text: string, icon: string) => {
  toast.custom((t) => <CustomToast t={t} text={text} icon={icon} />);
};

export default showToast;
