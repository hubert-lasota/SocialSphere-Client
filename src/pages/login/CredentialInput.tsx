import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import css from "./login.module.css";

type CredentialInputProps = {
  type: "username" | "password";
  inputValue: string;
  onChangeInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function CredentialInput(props: CredentialInputProps) {
  const { type, inputValue, placeholder = type === "username" ? "Username" : "Password", onChangeInputValue } = props;

  return (
    <div className={`${css["sign-in__input-container"]}`}>
      <FontAwesomeIcon icon={type === "username" ? faUser : faLock} className={`${css["sign-in__input__icon"]}`} />
      <input
        type={type === "username" ? "text" : "password"}
        className={`${css["sign-in__input"]}`}
        placeholder={placeholder}
        value={inputValue}
        onChange={onChangeInputValue}
      />
    </div>
  );
}
