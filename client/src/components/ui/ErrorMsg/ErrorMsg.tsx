import styles from "./ErrorMsg.module.scss";

interface ErrorMsgProps {
  message: string | undefined;
}

const ErrorMsg = ({ message }: ErrorMsgProps) => (
  <div className={styles.error}>
    <p>{message}</p>
  </div>
);

export default ErrorMsg;
