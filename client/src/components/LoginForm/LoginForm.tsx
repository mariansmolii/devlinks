import { useFormik } from "formik";
import { AxiosError } from "axios";
import { LoginData } from "../../types/auth";
import { useAppDispatch } from "../../hooks/useRedux";
import { login } from "../../store/auth/authOperations";

import Input from "../Input/Input";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import useAuth from "../../hooks/useAuth";
import BtnLoader from "../Loader/BtnLoader";
import styles from "./LoginForm.module.scss";
import CustomToast from "../CustomToast/CustomToast";
import authValidations from "../../utils/validations/authValidation";

const LoginForm = () => {
  const { isLoading } = useAuth();
  const dispatch = useAppDispatch();

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik<LoginData>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: authValidations.login,
    onSubmit: async ({ email, password }) => {
      if (!email.trim() || !password.trim()) return;

      try {
        await dispatch(login({ email, password })).unwrap();

        resetForm();
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          toast.custom((t) => (
            <CustomToast
              t={t}
              text={`${error?.response?.data?.message}!`}
              icon={"warning"}
            />
          ));
        } else {
          toast.custom((t) => (
            <CustomToast
              t={t}
              text={"An unknown error occurred!"}
              icon={"warning"}
            />
          ));
        }
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <div>
        <Input
          id="loginEmail"
          label="Email address"
          placeholder="e.g. alex@email.com"
          name="email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          iconName="icon-email"
          isError={!!(touched.email && errors.email)}
          errors={errors}
        />

        {touched.email && errors.email ? (
          <div className={styles.error}>
            <p>{errors.email}</p>
          </div>
        ) : null}
      </div>

      <div>
        <Input
          id="loginPassword"
          label="Password"
          placeholder="Enter your password"
          name="password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          iconName="icon-password"
          isError={!!(touched.password && errors.password)}
          errors={errors}
        />
        {touched.password && errors.password ? (
          <div className={styles.error}>
            <p>{errors.password}</p>
          </div>
        ) : null}
      </div>

      <Button
        title={isLoading ? <BtnLoader /> : "Login"}
        disabled={isLoading}
        variant={"primary"}
        type="submit"
      />
    </form>
  );
};

export default LoginForm;
