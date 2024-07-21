import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import css from "./password-input.module.css";

type PasswordInputProps = {
  password: string;
  placeholder: "Password" | "Confirm Password"
  handleChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PasswordInput(props: PasswordInputProps) {
  const { password, placeholder, handleChangePassword } = props;

  return (
    <div className={`${css["password"]}`}>
      <FontAwesomeIcon
        icon={faLock}
        className={`${css["password__icon"]}`}
      />
      <input
        type="password"
        className={`${css["password__input"]}`}
        placeholder={placeholder}
        value={password}
        onChange={handleChangePassword}
      />
    </div>
  );
}
