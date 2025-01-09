import Button from "../../components/ui/Button/Button";
import Section from "../../components/Section/Section";
import PageTitle from "../../components/PageTitle/PageTitle";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import HandleCatchError from "../../components/ui/HandleCatchError/HandleCatchError";
import styles from "./ProfilePage.module.scss";

import { useAppDispatch } from "../../hooks/useRedux";
import { resetStore } from "../../store/auth/authSlice";
import { logOut } from "../../store/auth/authOperations";
import Icon from "../../components/ui/Icon/Icon";

const ProfilePage = () => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
      dispatch(resetStore());
    } catch (error) {
      HandleCatchError(error);
    }
  };

  return (
    <Section className={styles.section}>
      <div>
        <PageTitle
          title="Profile Details"
          subtitle="Add your details to create a personal touch to your profile."
        />

        <Button
          title={<Icon iconName="icon-log-out" w={24} />}
          type="button"
          variant="primary"
          onClick={handleLogout}
        />
      </div>

      <ProfileForm />
    </Section>
  );
};

export default ProfilePage;
