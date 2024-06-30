import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

type UsernameInputProps = {
  username: string;
  handleChangeUsername: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UsernameInput(props: UsernameInputProps) {
  const { username, handleChangeUsername } = props;

  return (
    <div className="sign-in__password sign-in__password--fsmd sign-in__password--border-white">
      <FontAwesomeIcon
        icon={faUser}
        className="sign-in__username-icon sign-in__username-icon--navy"
      />

      <input
        type="text"
        className="sign-in__username-input sign-in__username-input--bg-white"
        placeholder="Username"
        value={username}
        onChange={handleChangeUsername}
      />
    </div>
  );
}
