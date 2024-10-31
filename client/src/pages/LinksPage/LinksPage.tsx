import { nanoid } from "nanoid";
import { NewLink } from "../../types/link";
import { useAppDispatch } from "../../hooks/useRedux";
import { addNewLink } from "../../store/link/linkSlice";
import { saveLinks } from "../../store/link/linkOperations";

import useLink from "../../hooks/useLink";
import styles from "./LinksPage.module.scss";
import options from "../../utils/data/selectData";
import Button from "../../components/Button/Button";
import Section from "../../components/Section/Section";
import LinkList from "../../components/LinkList/LinkList";
import PageTitle from "../../components/PageTitle/PageTitle";
import LinkInstruction from "../../components/LinkInstruction/LinkInstruction";

const LinksPage = () => {
  const { links } = useLink();
  const dispatch = useAppDispatch();

  const handleCreateLink = () => {
    const index = links.length;

    const newLink = {
      _id: nanoid(),
      index,
      url: "",
      platform: options[0],
      type: "new",
    };

    dispatch(addNewLink(newLink));
  };

  const handleSave = () => {
    const sanitizedLinks = links.map((link) => {
      if ("type" in link && link.type === "new") {
        const { platform, url, index } = link;

        return {
          platform,
          url,
          index,
        } as NewLink;
      }

      return link;
    });

    dispatch(saveLinks(sanitizedLinks));
  };

  return (
    <Section className={styles.section}>
      <PageTitle
        title="Customize your links"
        subtitle="Add/edit/remove links below and then share all your profiles with the world!"
      />

      <Button
        type="button"
        title="+ Add new link"
        variant="secondary"
        className={styles.btn}
        onClick={handleCreateLink}
      />

      {links.length === 0 ? (
        <LinkInstruction />
      ) : (
        <div className={styles.linksWrapper}>
          <LinkList links={links} />
        </div>
      )}

      <div className={styles.btnWrapper}>
        <Button
          type={"button"}
          title={"Save"}
          variant={"primary"}
          onClick={handleSave}
          disabled={links.length === 0}
        />
      </div>
    </Section>
  );
};

export default LinksPage;
