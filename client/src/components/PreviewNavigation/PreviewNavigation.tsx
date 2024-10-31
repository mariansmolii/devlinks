import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import Button from "../Button/Button";
import styles from "./PreviewNavigation.module.scss";

const PreviewNavigation = () => {
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? "/");

  return (
    <ul className={styles.list}>
      <li>
        <Link to={backLinkLocationRef.current}>Back to Editor</Link>
      </li>
      <li>
        <Button type="button" title="Share Link" variant={"primary"} />
      </li>
    </ul>
  );
};

export default PreviewNavigation;
