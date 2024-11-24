import Button from "../ui/Button/Button";
import useLink from "../../hooks/useLink";
import LinkItem from "../LinkItem/LinkItem";
import BtnLoader from "../ui/Loader/BtnLoader";
import LinkInstruction from "../LinkInstruction/LinkInstruction";
import styles from "./LinkForm.module.scss";

import {
  addDeletedLinkId,
  removeLinkLocal,
  reorderLinks,
  updateLink,
} from "../../store/link/linkSlice";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  SubmitHandler,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormHandleSubmit,
} from "react-hook-form";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useAppDispatch } from "../../hooks/useRedux";
import { FormValues, Platform } from "../../types/link";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

interface LinkFormProps {
  remove: UseFieldArrayRemove;
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  handleSubmit: UseFormHandleSubmit<FormValues>;
  fields: FieldArrayWithId<FormValues, "links", "keyId">[];
}

const LinkForm = ({
  fields,
  onSubmit,
  remove,
  handleSubmit,
  control,
  errors,
  getValues,
}: LinkFormProps) => {
  const dispatch = useAppDispatch();
  const { isLoading, deletedLinkIds } = useLink();

  const handleRemove = (index: number, id: string) => {
    remove(index);
    dispatch(removeLinkLocal(id));

    if (id.length === 24) {
      dispatch(addDeletedLinkId(id));
    }
  };

  const handleSelectChange = (id: string, value: Platform) => {
    dispatch(updateLink({ id, field: "platform", value }));
  };

  const handleInputChange = (id: string, value: string) => {
    dispatch(updateLink({ id, field: "url", value }));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((item) => item.keyId === active.id);
      const newIndex = fields.findIndex((item) => item.keyId === over.id);

      dispatch(reorderLinks({ oldIndex, newIndex }));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {fields.length === 0 ? (
        <LinkInstruction />
      ) : (
        <ul className={styles.list}>
          <DndContext
            modifiers={[restrictToVerticalAxis]}
            sensors={sensors}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={fields.map((link) => link.keyId)}>
              {fields.map((field, index) => (
                <LinkItem
                  key={field.keyId}
                  id={field._id}
                  keyId={field.keyId}
                  index={index}
                  control={control}
                  handleRemove={handleRemove}
                  handleSelectChange={handleSelectChange}
                  handleInputChange={handleInputChange}
                  errors={errors}
                  getValues={getValues}
                />
              ))}
            </SortableContext>
          </DndContext>
        </ul>
      )}

      <div className={styles.line} />

      <div className={styles.btnWrapper}>
        <Button
          type="submit"
          variant={"primary"}
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
