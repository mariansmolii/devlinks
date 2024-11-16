import toast from "react-hot-toast";
import Input from "../ui/Input/Input";
import Label from "../ui/Label/Label";
import Button from "../ui/Button/Button";
import useAuth from "../../hooks/useAuth";
import ErrorMsg from "../ui/ErrorMsg/ErrorMsg";
import BtnLoader from "../ui/Loader/BtnLoader";
import CustomToast from "../ui/CustomToast/CustomToast";
import styles from "./LoginForm.module.scss";

import { z } from "zod";
import { Err } from "../../types/auth";
import { useAppDispatch } from "../../hooks/useRedux";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { login } from "../../store/auth/authOperations";
import { loginSchema } from "../../utils/validations/auth";

const LoginForm = () => {
  const { isLoading } = useAuth();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async ({ email, password }: z.infer<typeof loginSchema>) => {
    if (!email.trim() || !password.trim()) return;

    try {
      await dispatch(login({ email, password })).unwrap();

      reset();
    } catch (error) {
      const err = error as Err;

      toast.custom((t) => (
        <CustomToast t={t} text={`${err?.message}!`} icon={"warning"} />
      ));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <Label
          id="loginEmail"
          label="Email address"
          error={errors.email?.message}
        />

        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              id="loginEmail"
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
          id="loginPassword"
          label="Password"
          error={errors.password?.message}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input
              id="loginPassword"
              type="password"
              placeholder="Enter your password"
              iconName="icon-password"
              error={errors.password?.message}
              {...field}
            />
          )}
        />

        {errors.password && <ErrorMsg message={errors.password.message} />}
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
