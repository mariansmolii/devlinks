import clsx from "clsx";
import styles from "./Label.module.scss";

interface LabelProps {
  id: string;
  label: string;
  error?: string;
}

const Label = ({ id, label, error }: LabelProps) => (
  <label
    htmlFor={id}
    className={clsx(styles.label, { [styles.error]: !!error })}
  >
    {label}
  </label>
);

export default Label;
