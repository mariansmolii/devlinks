import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import Button from "../ui/Button/Button";
import styles from "./PreviewNavigation.module.scss";
import CustomToast from "../ui/CustomToast/CustomToast";

import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const PreviewNavigation = () => {
  const { userId } = useAuth();
  const { VITE_FRONTEND_URL } = import.meta.env;

  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? "/");

  const handleShareLink = () => {
    navigator.clipboard.writeText(`${VITE_FRONTEND_URL}/share/${userId}`);
    toast.custom((t) => (
      <CustomToast
        t={t}
        text={"Link copied to clipboard!"}
        icon={"icon-link"}
      />
    ));
  };

  return (
    <ul className={styles.list}>
      <li>
        <Link to={backLinkLocationRef.current}>Back to Editor</Link>
      </li>
      <li>
        <Button
          type="button"
          title="Share Link"
          variant={"primary"}
          onClick={handleShareLink}
        />
      </li>
    </ul>
  );
};

export default PreviewNavigation;
