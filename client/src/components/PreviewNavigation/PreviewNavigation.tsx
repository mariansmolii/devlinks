import useAuth from "../../hooks/useAuth";
import Button from "../ui/Button/Button";
import showToast from "../ui/CustomToast/showToast";
import styles from "./PreviewNavigation.module.scss";

import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const PreviewNavigation = () => {
  const { userId } = useAuth();
  const { VITE_FRONTEND_URL } = import.meta.env;

  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? "/");

  const handleShareLink = () => {
    navigator.clipboard.writeText(`${VITE_FRONTEND_URL}/share/${userId}`);
    showToast("Link copied to clipboard!", "icon-link");
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
