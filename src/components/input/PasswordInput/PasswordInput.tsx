import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import styles from "./password-input.module.css";

type PasswordInputProps = {
  password: string;
  placeholder: "Password" | "Confirm Password"
  handleChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PasswordInput(props: PasswordInputProps) {
  const { password, placeholder, handleChangePassword } = props;

  return (
    <div className={`${styles["password"]} ${styles["password--fsmd"]} ${styles["password--border-white"]}`}>
      <FontAwesomeIcon
        icon={faLock}
        className={`${styles["password__icon"]} ${styles["password__icon--navy"]}`}
      />
      <input
        type="password"
        className={`${styles["password__input"]} ${styles["password__input--bg-white"]}`}
        placeholder={placeholder}
        value={password}
        onChange={handleChangePassword}
      />
    </div>
  );
}
