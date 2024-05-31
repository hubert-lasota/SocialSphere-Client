import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faLock } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import "../styles/login.css";

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
      className="login-form"
      onSubmit={(event) => login(username, password, event)}
    >
      <div className="login-form-header">Sign in!</div>
      <div className="input-container">
        <FontAwesomeIcon icon={faUser} className="login-form-input-icon" />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-container">
        <FontAwesomeIcon icon={faLock} className="login-form-input-icon" />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">SIGN IN</button>
      {isWarning ? (
        <div className="warning">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="warning-icon"
          />
          <span>Invalid credentials. Try again!</span>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
}
