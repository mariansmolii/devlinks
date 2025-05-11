import Label from "../ui/Label/Label";
import Input from "../ui/Input/Input";
import ErrorMsg from "../ui/ErrorMsg/ErrorMsg";

import { z } from "zod";
import { useAppDispatch } from "../../hooks/useRedux";
import { setFormData } from "../../store/profile/profileSlice";
import { profileSchema } from "../../utils/validations/profile";
import { Control, Controller, UseFormWatch } from "react-hook-form";

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFieldProps {
  name: "firstName" | "lastName" | "profileEmail";
  label: string;
  placeholder: string;
  control: Control<ProfileFormValues>;
  error?: string;
  dispatch: ReturnType<typeof useAppDispatch>;
  watch: UseFormWatch<ProfileFormValues>;
  setFormData: typeof setFormData;
}

const ProfileField = ({
  name,
  label,
  placeholder,
  control,
  error,
  dispatch,
  watch,
  setFormData,
}: ProfileFieldProps) => (
  <div>
    <Label id={name} label={label} error={error} />
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          id={name}
          type="text"
          {...field}
          onChange={(e) => {
            field.onChange(e);
            dispatch(setFormData({ ...watch(), [name]: e.target.value }));
          }}
          placeholder={placeholder}
          error={error}
        />
      )}
    />
    {error && <ErrorMsg message={error} />}
  </div>
);

export default ProfileField;
