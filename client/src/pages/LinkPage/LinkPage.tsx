import toast from "react-hot-toast";
import useLink from "../../hooks/useLink";
import options from "../../utils/data/selectData";
import Button from "../../components/ui/Button/Button";
import Section from "../../components/Section/Section";
import LinkForm from "../../components/LinkForm/LinkForm";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomToast from "../../components/ui/CustomToast/CustomToast";
import styles from "./LinkPage.module.scss";

import { nanoid } from "nanoid";
import { Err } from "../../types/auth";
import { useEffect, useMemo } from "react";
import { FormValues } from "../../types/link";
import { useAppDispatch } from "../../hooks/useRedux";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewLink, clearDeletedLinkIds } from "../../store/link/linkSlice";
import { useFieldArray, useForm } from "react-hook-form";
import { linkValidation } from "../../utils/validations/link";
import { removeLink, saveLinks } from "../../store/link/linkOperations";

const LinkPage = () => {
  const dispatch = useAppDispatch();
  const { links, deletedLinkIds } = useLink();

  const {
    control,
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(linkValidation),
    mode: "onChange",
    defaultValues: useMemo(() => ({ links }), [links]),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
    keyName: "keyId",
  });

  useEffect(() => {
    if (links.length > 0) {
      reset({ links });
    }
  }, [links, reset]);

  const handleAddLink = () => {
    const newLink = {
      _id: nanoid(),
      url: "",
      platform: options[0],
      index: fields.length,
    };

    append(newLink);
    dispatch(addNewLink(newLink));
  };

  const onSubmit = async () => {
    try {
      const sanitizedLinks = links.map((link) => {
        if (link._id?.length === 21) {
          const { url, platform, index } = link;

          return {
            url,
            platform,
            index,
          };
        }

        return link;
      });

      if (deletedLinkIds.length > 0) {
        await dispatch(removeLink({ linkIds: deletedLinkIds })).unwrap();
      }

      if (sanitizedLinks.length > 0) {
        await dispatch(saveLinks({ links: sanitizedLinks })).unwrap();
      }

      dispatch(clearDeletedLinkIds());

      toast.custom((t) => (
        <CustomToast
          t={t}
          text="Your changes have been successfully saved!"
          icon={"icon-changes-saved"}
        />
      ));
    } catch (error) {
      const err = error as Err;

      toast.custom((t) => (
        <CustomToast t={t} text={`${err?.message}!`} icon={"warning"} />
      ));
    }
  };

  return (
    <Section className={styles.section}>
      <PageTitle
        title="Customize your links"
        subtitle="Add/edit/remove links below and then share all your profiles with the world!"
      />

      <Button
        type="button"
        title="+ Add new link"
        variant="secondary"
        className={styles.btn}
        onClick={handleAddLink}
      />

      <LinkForm
        fields={fields}
        remove={remove}
        register={register}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        control={control}
        errors={errors}
        getValues={getValues}
      />
    </Section>
  );
};

export default LinkPage;
