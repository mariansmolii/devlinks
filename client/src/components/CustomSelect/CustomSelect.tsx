import { FC } from "react";
import { Platform } from "../../types/link";
import Select, {
  ActionMeta,
  components,
  OptionProps,
  SingleValueProps,
  SingleValue,
} from "react-select";

import "./CustomSelect.scss";
import Icon from "../Icon/Icon";

interface CustomSelectProps {
  platformId: string;
  handleChange: (
    selectedOption: SingleValue<Platform> | null,
    actionMeta: ActionMeta<Platform>
  ) => void;
  value: Platform | null;
  options: Platform[];
}

const Option: FC<OptionProps<Platform>> = (props) => (
  <components.Option {...props}>
    <Icon w={16} iconName={props.data.iconName} />
    <span>{props.data.label}</span>
  </components.Option>
);

const SingleValueComponent: FC<SingleValueProps<Platform>> = ({
  children,
  ...props
}) => (
  <components.SingleValue {...props}>
    <Icon w={16} iconName={props.data.iconName} />
    <span>{children}</span>
  </components.SingleValue>
);

const CustomSelect: FC<CustomSelectProps> = ({
  platformId,
  handleChange,
  value,
  options,
}) => {
  return (
    <Select
      inputId={platformId}
      name="platform"
      value={value}
      options={options}
      isSearchable={false}
      defaultValue={options[0]}
      classNamePrefix="custom-select"
      components={{ Option, SingleValue: SingleValueComponent }}
      onChange={(newValue, actionMeta) =>
        handleChange(newValue as SingleValue<Platform>, actionMeta)
      }
      openMenuOnFocus={true}
      styles={{
        menuList: (base) => ({
          ...base,
          "::-webkit-scrollbar": {
            display: "none",
          },
        }),
      }}
    />
  );
};

export default CustomSelect;
