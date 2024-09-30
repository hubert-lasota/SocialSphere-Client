import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CredentialInput from "../../components/input/credential_input/CredentialInput";
import css from "./login.module.css";

type LoginFormProps = {
  isWarning: boolean;
  handleSignIn: (username: string, password: string) => void;
};

export default function LoginForm(props: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isWarning, handleSignIn } = props;

  function handleChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  return (
    <form
      className={css["login__sign-in"]}
      onSubmit={(event) => {
        event.preventDefault();
        handleSignIn(username, password);
      }}
    >
      <div className={`${css["sign-in__header"]}`}>Sign in!</div>
      <CredentialInput type="username" inputValue={username} onChangeInputValue={handleChangeUsername} />
      <CredentialInput type="password" inputValue={password} onChangeInputValue={handleChangePassword} />

      <button className={css["sign-in__btn"]}>SIGN IN</button>

      {isWarning ? (
        <div className={css["sign-in__warning"]}>
          <FontAwesomeIcon icon={faCircleExclamation} className={`${css["warning__icon"]}`} size="2x" />
          <span className={`${css["warning__text"]}`}>Invalid credentials. Try again!</span>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
}
