import Section from "../../components/Section/Section";
import PageTitle from "../../components/PageTitle/PageTitle";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import styles from "./ProfilePage.module.scss";

const ProfilePage = () => (
  <Section className={styles.section}>
    <PageTitle
      title="Profile Details"
      subtitle="Add your details to create a personal touch to your profile."
    />

    <ProfileForm />
  </Section>
);

export default ProfilePage;
