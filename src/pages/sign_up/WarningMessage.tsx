import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import css from "./sign-up.module.css";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

type WarningMessageProps = {
  message: string
}

export default function WarningMessage(props: WarningMessageProps) {
  const { message } = props;
  return (
    <div className={css["warning"]}>
      <FontAwesomeIcon icon={faCircleExclamation} className={`${css["warning__icon"]}`} size="2x" />
      <span className={`${css["warning__text"]}`}>{message}</span>
    </div>
  );
}