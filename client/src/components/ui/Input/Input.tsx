import clsx from "clsx";
import Icon from "../Icon/Icon";
import styles from "./Input.module.scss";
import useScreenSize from "../../../hooks/useScreenSize";
import getErrorStylePadding from "../../../utils/helpers/getErrorStylePadding";

import { forwardRef, InputHTMLAttributes } from "react";

type InputType = "text" | "password" | "email";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  type: InputType;
  value: string;
  placeholder?: string;
  iconName?: string;
  pattern?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      type,
      placeholder,
      value,
      iconName,
      pattern,
      error,
      ...rest
    }: InputProps,
    ref
  ) => {
    const { width } = useScreenSize();

    const errorStylePadding = getErrorStylePadding(
      width,
      !!error,
      error?.length ?? 0
    );

    return (
      <div className={styles.wrapper}>
        {iconName && <Icon iconName={iconName} w={16} />}

        <input
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          pattern={pattern}
          className={clsx({ [styles.error]: !!error })}
          style={{ paddingRight: errorStylePadding }}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

export default Input;
