import Button from "../ui/Button/Button";
import useLink from "../../hooks/useLink";
import LinkItem from "../LinkItem/LinkItem";
import BtnLoader from "../ui/Loader/BtnLoader";
import LinkInstruction from "../LinkInstruction/LinkInstruction";
import styles from "./LinkForm.module.scss";

import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  SubmitHandler,
  UseFieldArrayRemove,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../hooks/useRedux";
import { FormValues, Platform } from "../../types/link";
import { removeLinkLocal, updateLink } from "../../store/link/linkSlice";

interface LinkFormProps {
  deletedLinkIds: string[];
  remove: UseFieldArrayRemove;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  register: UseFormRegister<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  setDeletedLinkIds: Dispatch<SetStateAction<string[]>>;
  fields: FieldArrayWithId<FormValues, "links", "keyId">[];
}

const LinkForm = ({
  fields,
  onSubmit,
  remove,
  register,
  handleSubmit,
  control,
  errors,
  setDeletedLinkIds,
  deletedLinkIds,
}: LinkFormProps) => {
  const { isLoading } = useLink();
  const dispatch = useAppDispatch();

  const handleRemove = (index: number, id: string) => {
    remove(index);
    dispatch(removeLinkLocal(id));

    setDeletedLinkIds((prev) => (id.length === 24 ? [...prev, id] : prev));
  };

  const handleSelectChange = (id: string, value: Platform) => {
    dispatch(updateLink({ id, field: "platform", value }));
  };

  const handleInputChange = (id: string, value: string) => {
    dispatch(updateLink({ id, field: "url", value }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.length === 0 ? (
        <LinkInstruction />
      ) : (
        <ul className={styles.list}>
          {fields.map((field, index) => (
            <LinkItem
              key={field.keyId}
              id={field._id}
              keyId={field.keyId}
              index={index}
              register={register}
              control={control}
              handleRemove={handleRemove}
              handleSelectChange={handleSelectChange}
              handleInputChange={handleInputChange}
              errors={errors}
            />
          ))}
        </ul>
      )}

      <div className={styles.line} />

      <div className={styles.btnWrapper}>
        <Button
          type="submit"
          variant={"primary"}
          className={styles.btn}
          title={isLoading ? <BtnLoader /> : "Save"}
          disabled={
            (fields.length === 0 && deletedLinkIds.length === 0) || isLoading
          }
        />
      </div>
    </form>
  );
};

export default LinkForm;
