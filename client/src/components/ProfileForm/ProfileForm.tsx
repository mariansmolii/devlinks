import toast from "react-hot-toast";
import Label from "../ui/Label/Label";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import BtnLoader from "../ui/Loader/BtnLoader";
import ErrorMsg from "../ui/ErrorMsg/ErrorMsg";
import useProfile from "../../hooks/useProfile";
import CustomToast from "../ui/CustomToast/CustomToast";
import ImageUploader from "../ImageUploader/ImageUploader";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import HandleCatchError from "../ui/HandleCatchError/HandleCatchError";
import styles from "./ProfileForm.module.scss";

import { z } from "zod";
import { ChangeEvent } from "react";
import { useAppDispatch } from "../../hooks/useRedux";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../../utils/validations/profile";
import { Controller, useForm } from "react-hook-form";
import {
  setFormData,
  setProfileImagePreview,
} from "../../store/profile/profileSlice";
import { updateProfileInfo } from "../../store/profile/profileOperations";

const ProfileForm = () => {
  const dispatch = useAppDispatch();
  const {
    personalDetails: { firstName, lastName, profileEmail },
    profileImage: { previewImage },
    isLoading,
  } = useProfile();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName,
      lastName,
      profileEmail,
    },
    mode: "onChange",
    values: {
      firstName,
      lastName,
      profileEmail,
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileSize = Number((file.size / 1024 / 1024).toFixed(4));
    const fileFormat = ["image/jpeg", "image/png"].includes(file.type);

    if (fileSize >= 5) {
      return toast.custom((t) => (
        <CustomToast
          t={t}
          text={"Image size must be less than 5 MB"}
          icon={"warning"}
        />
      ));
    }

    if (!fileFormat) {
      return toast.custom((t) => (
        <CustomToast
          t={t}
          text={"Image must be in PNG or JPG format"}
          icon={"warning"}
        />
      ));
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        dispatch(setProfileImagePreview(reader.result as string));
      }
    };

    reader.readAsDataURL(file);
  };

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    const formData = new FormData();

    // TODO: add posibility to upload image to server

    try {
      if (previewImage) {
        formData.append("profileImage", previewImage);
      }

      dispatch(updateProfileInfo(data));

      toast.custom((t) => (
        <CustomToast
          t={t}
          text="Your changes have been successfully saved!"
          icon="icon-changes-saved"
        />
      ));
    } catch (error) {
      HandleCatchError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <ContentWrapper className={styles.contentWrapper}>
        <Label id="profileImagePreview" label="Profile picture" />

        <ImageUploader
          id="profileImagePreview"
          handleImageChange={handleImageChange}
        />

        <p>Image must be below 1024x1024px. Use PNG or JPG format.</p>
      </ContentWrapper>

      <ContentWrapper className={styles.inputWrapper}>
        <div>
          <Label
            id="firstName"
            label="First name*"
            error={errors.firstName?.message}
          />

          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                id="firstName"
                type="text"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  dispatch(
                    setFormData({ ...watch(), firstName: e.target.value })
                  );
                }}
                placeholder="e.g. John"
                error={errors.firstName?.message}
              />
            )}
          />

          {errors.firstName && <ErrorMsg message={errors.firstName.message} />}
        </div>

        <div>
          <Label
            id="lastName"
            label="Last name*"
            error={errors.lastName?.message}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                id="lastName"
                type="text"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  dispatch(
                    setFormData({ ...watch(), lastName: e.target.value })
                  );
                }}
                placeholder="e.g. Appleseed"
                error={errors.lastName?.message}
              />
            )}
          />

          {errors.lastName && <ErrorMsg message={errors.lastName.message} />}
        </div>

        <div>
          <Label
            id="profileEmail"
            label="Email"
            error={errors.profileEmail?.message}
          />

          <Controller
            name="profileEmail"
            control={control}
            render={({ field }) => (
              <Input
                id="profileEmail"
                type="text"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  dispatch(
                    setFormData({ ...watch(), profileEmail: e.target.value })
                  );
                }}
                placeholder="e.g. email@example.com"
                error={errors.profileEmail?.message}
              />
            )}
          />

          {errors.profileEmail && (
            <ErrorMsg message={errors.profileEmail.message} />
          )}
        </div>
      </ContentWrapper>

      <div className={styles.line} />

      <div className={styles.btnWrapper}>
        <Button
          type="submit"
          variant={"primary"}
          className={styles.btn}
          title={isLoading ? <BtnLoader /> : "Save"}
          disabled={
            isLoading ||
            !firstName.trim() ||
            !lastName.trim() ||
            !!errors.firstName ||
            !!errors.lastName
          }
        />
      </div>
    </form>
  );
};

export default ProfileForm;
