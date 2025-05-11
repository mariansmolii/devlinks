import Label from "../ui/Label/Label";
import Input from "../ui/Input/Input";
import ErrorMsg from "../ui/ErrorMsg/ErrorMsg";

import { Controller } from "react-hook-form";
import { useAppDispatch } from "../../hooks/useRedux";
import { setFormData } from "../../store/profile/profileSlice";

interface ProfileFieldProps {
  name: "firstName" | "lastName" | "profileEmail";
  label: string;
  placeholder: string;
  control: any;
  error?: string;
  dispatch: ReturnType<typeof useAppDispatch>;
  watch: any;
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
