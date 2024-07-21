import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import css from "./username-input.module.css";

type UsernameInputProps = {
  username: string;
  handleChangeUsername: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UsernameInput(props: UsernameInputProps) {
  const { username, handleChangeUsername } = props;
  return (
    <div
      className={`${css["username"]}`}
    >
      <FontAwesomeIcon
        icon={faUser}
        className={`${css["username__icon"]}`}
      />

      <input
        type="text"
        className={`${css["username__input"]}`}
        placeholder="Username"
        value={username}
        onChange={handleChangeUsername}
      />
    </div>
  );
}
