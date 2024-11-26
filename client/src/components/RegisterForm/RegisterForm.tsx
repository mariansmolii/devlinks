import Input from "../ui/Input/Input";
import Label from "../ui/Label/Label";
import toast from "react-hot-toast";
import Button from "../ui/Button/Button";
import useAuth from "../../hooks/useAuth";
import ErrorMsg from "../ui/ErrorMsg/ErrorMsg";
import BtnLoader from "../ui/Loader/BtnLoader";
import styles from "./RegisterForm.module.scss";
import CustomToast from "../ui/CustomToast/CustomToast";
import HandleCatchError from "../ui/HandleCatchError/HandleCatchError";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../hooks/useRedux";
import { useForm, Controller } from "react-hook-form";
import { register } from "../../store/auth/authOperations";
import { registerSchema } from "../../utils/validations/auth";

const RegisterForm = () => {
  const { isLoading } = useAuth();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async ({
    email,
    password,
    confirmPassword,
  }: z.infer<typeof registerSchema>) => {
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) return;

    try {
      await dispatch(register({ email, password })).unwrap();

      toast.custom((t) => (
        <CustomToast t={t} text="Registration is successful!" icon={"check"} />
      ));

      reset();
    } catch (error) {
      HandleCatchError(error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <Label
          id="registerEmail"
          label="Email address"
          error={errors.email?.message}
        />

        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              id="registerEmail"
              type="email"
              placeholder="e.g. alex@email.com"
              iconName="icon-email"
              error={errors.email?.message}
              {...field}
            />
          )}
        />

        {errors.email && <ErrorMsg message={errors.email.message} />}
      </div>

      <div>
        <Label
          id="registerPassword"
          label="Password"
          error={errors.password?.message}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              id="registerPassword"
              type="password"
              placeholder="At least 8 characters"
              iconName="icon-password"
              error={errors.password?.message}
              {...field}
            />
          )}
        />

        {errors.password && <ErrorMsg message={errors.password.message} />}
      </div>

      <div>
        <Label
          id="confirmPassword"
          label="Confirm password"
          error={errors.confirmPassword?.message}
        />

        <Controller
          name="confirmPassword"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              id="confirmPassword"
              type="password"
              placeholder="At least 8 characters"
              iconName="icon-password"
              error={errors.confirmPassword?.message}
              {...field}
            />
          )}
        />

        {errors.confirmPassword && (
          <ErrorMsg message={errors.confirmPassword.message} />
        )}
      </div>

      <p className={styles.text}>Password must contain at least 8 characters</p>

      <Button
        title={isLoading ? <BtnLoader /> : "Create new account"}
        disabled={isLoading}
        variant={"primary"}
        type="submit"
      />
    </form>
  );
};

export default RegisterForm;
