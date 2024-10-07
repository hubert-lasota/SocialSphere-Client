import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties } from "react";
import css from "./credential-input.module.css";

type CredentialInputProps = {
  type: "username" | "password";
  inputValue: string;
  onChangeInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputContainerStyle?: CSSProperties;
  inputStyle?: CSSProperties;
};

export default function CredentialInput(props: CredentialInputProps) {
  const {
    type,
    inputValue,
    placeholder = type === "username" ? "Username" : "Password",
    onChangeInputValue,
    inputContainerStyle,
    inputStyle,
  } = props;

  return (
    <div className={`${css["input-container"]}`} style={inputContainerStyle}>
      <FontAwesomeIcon icon={type === "username" ? faUser : faLock} className={`${css["input__icon"]}`} />
      <input
        type={type === "username" ? "text" : "password"}
        className={`${css["input"]}`}
        placeholder={placeholder}
        value={inputValue}
        onChange={onChangeInputValue}
        style={inputStyle}
      />
    </div>
  );
}
