import Icon from "../ui/Icon/Icon";
import Input from "../ui/Input/Input";
import Label from "../ui/Label/Label";
import ErrorMsg from "../ui/ErrorMsg/ErrorMsg";
import options from "../../utils/data/selectData";
import CustomSelect from "../ui/CustomSelect/CustomSelect";
import getLinkPlaceholder from "../../utils/helpers/getLinkPlaceholder";
import styles from "./LinkItem.module.scss";

import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { FormValues, Platform } from "../../types/link";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

interface LinkItemProps {
  id: string;
  keyId: string;
  index: number;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
  handleRemove: (index: number, id: string) => void;
  handleInputChange: (id: string, value: string) => void;
  handleSelectChange: (id: string, value: Platform) => void;
}

const LinkItem = ({
  id,
  keyId,
  index,
  errors,
  control,
  register,
  handleRemove,
  handleSelectChange,
  handleInputChange,
}: LinkItemProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(
    null
  );

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: keyId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li className={styles.item} ref={setNodeRef} style={style}>
      <div className={styles.wrapper}>
        <div {...attributes} {...listeners}>
          <Icon w={12} h={6} iconName="icon-drag-and-drop" />
          <p>Link #{index + 1}</p>
        </div>
        <button type="button" onClick={() => handleRemove(index, id)}>
          Remove
        </button>
      </div>

      <div className={styles.selectWrapper}>
        <Label id={`${keyId}platform`} label="Platform" />

        <Controller
          name={`links.${index}.platform`}
          control={control}
          render={({ field }) => (
            <CustomSelect
              id={`${keyId}platform`}
              options={options}
              {...field}
              onChange={(value) => {
                handleSelectChange(id, value ?? options[0]);
                setSelectedPlatform(value);
                field.onChange(value);
              }}
            />
          )}
        />
      </div>

      <div className={styles.inputWrapper}>
        <Label
          id={keyId}
          label="Link"
          error={errors.links?.[index]?.url?.message}
        />

        <Input
          id={keyId}
          type="text"
          iconName="icon-link"
          {...register(`links.${index}.url`)}
          onBlur={(e) => handleInputChange(id, e.target.value.trim())}
          placeholder={getLinkPlaceholder(selectedPlatform ?? options[0])}
          error={errors.links?.[index]?.url?.message}
        />

        {errors.links?.[index]?.url && (
          <ErrorMsg message={errors.links[index].url.message} />
        )}
      </div>
    </li>
  );
};

export default LinkItem;
