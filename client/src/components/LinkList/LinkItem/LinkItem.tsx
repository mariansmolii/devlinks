import { useAppDispatch } from "../../../hooks/useRedux";
import { ErrorState, Platform } from "../../../types/link";
import { ChangeEvent, useEffect, useId, useMemo, useState } from "react";
import { deleteLinkLocally, updateLink } from "../../../store/link/linkSlice";

import Icon from "../../Icon/Icon";
import Input from "../../Input/Input";
import debounce from "lodash.debounce";
import styles from "./LinkItem.module.scss";
import options from "../../../utils/data/selectData";
import CustomSelect from "../../CustomSelect/CustomSelect";
import validateLinkInput from "../../../utils/helpers/validateLinkInput";
import getLinkValidation from "../../../utils/validations/linkValidation";
import getLinkPlaceholder from "../../../utils/helpers/getLinkPlaceholder";
import { deleteLink } from "../../../store/link/linkOperations";

interface LinkItemProps {
  id: string;
  index: number;
  platform: Platform;
  url: string;
}

const LinkItem = ({ id, index, platform, url }: LinkItemProps) => {
  const linkId = useId();
  const platformId = useId();
  const dispatch = useAppDispatch();

  const debouncedUpdateLink = useMemo(
    () =>
      debounce((id: string, value: string) => {
        dispatch(updateLink({ id, url: value }));
      }, 300),
    [dispatch]
  );

  useEffect(() => {
    return () => {
      debouncedUpdateLink.cancel();
    };
  }, [debouncedUpdateLink]);

  const [selectedOption, setSelectedOption] = useState<Platform>(platform);
  const [inputValues, setInputValues] = useState<Record<string, string>>({
    [id]: url || "",
  });
  const [error, setError] = useState<ErrorState>({});

  const updateErrors = (id: string, url: string, platform: Platform) => {
    const { isError, message } = validateLinkInput(url, platform);

    setError((prev) => ({
      ...prev,
      [id]: { isError, message },
    }));
  };

  const handleSelectChange = (selectedOption: Platform, id: string) => {
    setSelectedOption(selectedOption);

    const url = inputValues[id];

    updateErrors(id, url, selectedOption);

    dispatch(updateLink({ id, platform: selectedOption }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    updateErrors(id, value, selectedOption);

    debouncedUpdateLink(id, value);
  };

  const handleDelete = () => {
    dispatch(deleteLinkLocally(id));

    dispatch(deleteLink({ _id: id }));
  };

  return (
    <li className={styles.item}>
      <div className={styles.wrapper}>
        <div>
          <Icon w={12} h={6} iconName="icon-drag-and-drop" />
          <p>Link #{index + 1}</p>
        </div>
        <button type="button" onClick={handleDelete}>
          Remove
        </button>
      </div>

      <div className={styles.selectWrapper}>
        <label htmlFor={platformId}>Platform</label>
        <CustomSelect
          platformId={platformId}
          handleChange={(selectedOption) =>
            selectedOption && handleSelectChange(selectedOption, id)
          }
          options={options}
          value={selectedOption}
        />
      </div>

      <div className={styles.inputWrapper}>
        <Input
          id={linkId}
          type="text"
          name="linkUrl"
          value={inputValues[id]}
          onChange={handleInputChange}
          iconName={"icon-link"}
          label={"Link"}
          placeholder={getLinkPlaceholder(selectedOption)}
          pattern={getLinkValidation(selectedOption).toString()}
          isError={error[id]?.isError}
          errors={{ linkUrl: error[id]?.message }}
          onBlur={() => dispatch(updateLink({ id, url: inputValues[id] }))}
        />

        {error[id]?.isError && <p>{error[id]?.message}</p>}
      </div>
    </li>
  );
};

export default LinkItem;
