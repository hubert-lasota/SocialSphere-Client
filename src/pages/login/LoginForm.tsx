import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import UsernameInput from "../../components/input/UsernameInput/UsernameInput";
import PasswordInput from "../../components/input/PasswordInput/PasswordInput";
import css from "./login.module.css";
import SubmitButton from "../../components/button/SubmitButton";

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
      <div
        className={`${css["sign-in__header"]}`}
      >
        Sign in!
      </div>
      <UsernameInput
        username={username}
        handleChangeUsername={handleChangeUsername}
      />
      <PasswordInput
        password={password}
        placeholder="Password"
        handleChangePassword={handleChangePassword}
      />
      <SubmitButton text="SIGN IN" />

      {isWarning ? (
        <div className={css["sign-in__warning"]}>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className={`${css["warning__icon"]}`}
            size="2x"
          />
          <span className={`${css["warning__text"]}`}>
            Invalid credentials. Try again!
          </span>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
}
