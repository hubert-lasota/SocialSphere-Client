import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import styles from "./username-input.module.css";

type UsernameInputProps = {
  username: string;
  handleChangeUsername: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UsernameInput(props: UsernameInputProps) {
  const { username, handleChangeUsername } = props;
  return (
    <div
      className={`${styles["username"]} ${styles["username--fsmd"]} ${styles["username--border-white"]}`}
    >
      <FontAwesomeIcon
        icon={faUser}
        className={`${styles["username__icon"]} ${styles["username__icon--navy"]}`}
      />

      <input
        type="text"
        className={`${styles["username__input"]} ${styles["username__input--bg-white"]}`}
        placeholder="Username"
        value={username}
        onChange={handleChangeUsername}
      />
    </div>
  );
}
