import clsx from "clsx";
import Icon from "../ui/Icon/Icon";
import styles from "./PreviewLinkList.module.scss";

import { Link } from "../../types/link";

interface PreviewLinkListProps {
  showAll?: boolean;
  className?: string;
  links: Link[];
}

const PreviewLinkList = ({
  className,
  showAll = false,
  links,
}: PreviewLinkListProps) => {
  return (
    <ul className={clsx(styles.list, className)}>
      {(showAll ? links : links.slice(0, 5)).map(({ _id, platform, url }) => (
        <li
          key={_id}
          className={styles.item}
          style={{ backgroundColor: platform?.color }}
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <div>
              <Icon w={16} iconName={platform?.iconName} />
              <p>{platform?.label}</p>
            </div>
            <Icon iconName="icon-arrow-right" w={16} />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default PreviewLinkList;
