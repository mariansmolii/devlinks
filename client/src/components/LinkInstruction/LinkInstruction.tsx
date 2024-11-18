import Icon from "../ui/Icon/Icon";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import styles from "./LinkInstruction.module.scss";

const LinkInstruction = () => (
  <ContentWrapper className={styles.instruction}>
    <Icon iconName="icon-illustration-empty" w={125} h={80} />
    <h2>Let&apos;s get you started</h2>
    <p>
      Use the “Add new link” button to get started. Once you have more than one
      link, you can reorder and edit them. We&apos;re here to help you share
      your profiles with everyone!
    </p>
  </ContentWrapper>
);

export default LinkInstruction;
