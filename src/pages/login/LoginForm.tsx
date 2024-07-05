import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import UsernameInput from "../../components/input/UsernameInput/UsernameInput";
import PasswordInput from "../../components/input/PasswordInput/PasswordInput";
import styles from "./login.module.css";
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
      className={styles["login__sign-in"]}
      onSubmit={(event) => {
        event.preventDefault();
        handleSignIn(username, password);
      }}
    >
      <div
        className={`${styles["sign-in__header"]} ${styles["sign-in__header--fslarge"]}`}
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
        <div className={styles["sign-in__warning"]}>
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className={`${styles["warning__icon"]} ${styles["warning__icon--red"]}`}
            size="2x"
          />
          <span className={`${styles["warning__text"]} ${styles["warning__text--red"]} ${styles["warning__text--fslarge"]}`}>
            Invalid credentials. Try again!
          </span>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
}
