import { Link } from "../../types/link";

const getSanitizedLinks = (links: Link[]) =>
  links.map((link) => {
    if (link._id?.length === 21) {
      const { url, platform, index } = link;

      return {
        url,
        platform,
        index,
      };
    }

    return link;
  });

export default getSanitizedLinks;
