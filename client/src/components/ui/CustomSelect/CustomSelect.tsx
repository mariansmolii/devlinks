import Icon from "../Icon/Icon";
import "./CustomSelect.scss";

import Select, {
  components,
  GroupBase,
  OptionProps,
  Props,
  SelectInstance,
  SingleValueProps,
} from "react-select";
import { forwardRef, Ref } from "react";
import { Platform } from "../../../types/link";

const Option = (props: OptionProps<Platform, false, GroupBase<Platform>>) => (
  <components.Option {...props}>
    <Icon w={16} iconName={props.data.iconName} />
    <span>{props.data.label}</span>
  </components.Option>
);

const SingleValueComponent = ({
  children,
  ...props
}: SingleValueProps<Platform, false, GroupBase<Platform>>) => (
  <components.SingleValue {...props}>
    <Icon w={16} iconName={props.data.iconName} />
    <span>{children}</span>
  </components.SingleValue>
);

interface CustomSelectProps
  extends Props<Platform, false, GroupBase<Platform>> {
  id: string;
  name: string;
  value: Platform;
}

const CustomSelect = forwardRef<SelectInstance, CustomSelectProps>(
  ({ id, options, ...rest }: CustomSelectProps, ref) => {
    return (
      <Select
        inputId={id}
        classNamePrefix="custom-select"
        options={options}
        isSearchable={false}
        styles={{
          menuList: (base) => ({
            ...base,
            "::-webkit-scrollbar": {
              display: "none",
            },
          }),
        }}
        components={{ Option, SingleValue: SingleValueComponent }}
        ref={ref as Ref<SelectInstance<Platform, false, GroupBase<Platform>>>}
        menuPortalTarget={document.body}
        {...rest}
      />
    );
  }
);

export default CustomSelect;
