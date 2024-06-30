import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

type PasswordInputProps = {
  password: string;
  handleChangePassword: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PasswordInput(props: PasswordInputProps) {
  const { password, handleChangePassword } = props;

  return (
    <div className="sign-in__password sign-in__password--fsmd sign-in__password--border-white">
      <FontAwesomeIcon
        icon={faLock}
        className="sign-in__password-icon sign-in__pasword-icon--navy"
      />
      <input
        type="password"
        className="sign-in__password-input sign-in__password-input--bg-white"
        placeholder="Password"
        value={password}
        onChange={handleChangePassword}
      />
    </div>
  );
}
