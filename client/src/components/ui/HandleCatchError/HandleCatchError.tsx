import showToast from "../CustomToast/showToast";

import { Err } from "../../../types/auth";

const HandleCatchError = (error: unknown) => {
  const err = error as Err;

  showToast(`${err?.message}!`, "warning");
};

export default HandleCatchError;
