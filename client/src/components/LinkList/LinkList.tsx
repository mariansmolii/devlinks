import { Link, NewLink } from "../../types/link";

import LinkItem from "./LinkItem/LinkItem";
import styles from "./LinkList.module.scss";

interface LinkListProps {
  links: Link[] | NewLink[];
}

const LinkList = ({ links }: LinkListProps) => (
  <ul className={styles.list}>
    {links.map(({ _id, index, url, platform }) => (
      <LinkItem
        key={_id}
        id={_id}
        index={index}
        platform={platform}
        url={url}
      />
    ))}
  </ul>
);

export default LinkList;
