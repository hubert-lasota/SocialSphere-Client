import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "../../styles/login.css";
import Input from "../../components/Input";
import Button from "../../components/Button";

type LoginFormProps = {
  isWarning: boolean;

  login: (
    username: string,
    password: string,
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
};

export default function LoginForm(props: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isWarning, login } = props;

  return (
    <form
      className="login__sign-in"
      onSubmit={(event) => login(username, password, event)}
    >
      <div className="sign-in__header sign-in__header--fslarge">Sign in!</div>
      <div className="sign-in__username sign-in__username--fsmd sign-in__username--border-white">
        <FontAwesomeIcon
          icon={faUser}
          className="sign-in__username-icon sign-in__username-icon--navy"
        />
        <Input
          className="sign-in__username-input sign-in__username-input--bg-white"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="sign-in__password sign-in__password--fsmd sign-in__password--border-white">
        <FontAwesomeIcon
          icon={faLock}
          className="sign-in__password-icon sign-in__password-icon--navy"
        />
        <Input
          className="sign-in__password-input sign-in__password-input--bg-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        className="sign-in__btn sign-in__btn--fslg sign-in__btn--fwhite sign-in__btn--bgcolor-navy"
        type="submit"
        text="SIGN IN"
      />
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
