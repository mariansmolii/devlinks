import toast from "react-hot-toast";
import CustomToast from "../CustomToast/CustomToast";

import { Err } from "../../../types/auth";

const HandleCatchError = (error: unknown) => {
  const err = error as Err;

  toast.custom((t) => (
    <CustomToast t={t} text={`${err?.message}!`} icon={"warning"} />
  ));
};

export default HandleCatchError;
