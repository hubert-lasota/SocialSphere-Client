import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation} from "@fortawesome/free-solid-svg-icons";

import "../../styles/login.css";

import UsernameInput from "../../components/input/UsernameInput";
import PasswordInput from "../../components/input/PasswordInput";
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
      className="login__sign-in"
      onSubmit={(event) => {
        event.preventDefault();
        handleSignIn(username, password);
      }}
    >
      <div className="sign-in__header sign-in__header--fslarge">Sign in!</div>
      <UsernameInput
        username={username}
        handleChangeUsername={handleChangeUsername}
      />
      <PasswordInput
        password={password}
        handleChangePassword={handleChangePassword}
      />
      <button
        className="sign-in__btn sign-in__btn--fslg sign-in__btn--fwhite sign-in__btn--bgcolor-navy"
        type="submit"
      >
       Sign in
      </button>
      {/* <SubmitButton text="SIGN IN" /> */}

      {isWarning ? (
        <div className="sign-in__warning">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="sign-in__warning-icon sign-in__warning-icon--red"
            size="2x"
          />
          <span className="sign-in__warning-text--red sign-in__warning-text--fslarge">
            Invalid credentials. Try again!
          </span>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
}
