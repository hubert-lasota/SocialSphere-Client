import { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import useLocalStorage from "../../hooks/useLocalStorage";
import authService from "../../services/authService";
import { LoginResponse } from "../../types/auth.types";
import styles from "./login.module.css";

export default function Login() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [, setJwtItem] = useLocalStorage("jwt", "");
  const [, setUserIdItem] = useLocalStorage("user_id", "");
  const [, setUsernameItem] = useLocalStorage("username", "");
  const [isWarning, setIsWarning] = useState(false);

  async function handleSignIn(username: string, password: string) {
    const response: LoginResponse = await authService.login({
      username: username,
      password: password,
    });

    if (response.success) {
      const { userId, username, jwt } = response.login;
      setUserIdItem(userId);
      setUsernameItem(username);
      setJwtItem(jwt);
      setIsAuthorized(true);
    } else {
      setIsWarning(true);
      setIsAuthorized(false);
    }
  }

  return (
    <div className={styles["login"]}>
      <div className={styles["login__sign-up"]}>
        <div className={`${styles["sign-up__header"]} ${styles["sign-up__header--fwhite"]} ${styles["sign-up__header--fslarge"]}`}>
          <p>Register with username and password</p>
          <p>to be able to use Social Sphere</p>
        </div>
        <button className={`${styles["sign-up__btn"]} ${styles["sign-up__btn--white"]} ${styles["sign-up__btn--fsmd"]}`}>
          SIGN UP
        </button>
      </div>

      <LoginForm isWarning={isWarning} handleSignIn={handleSignIn} />
      {isAuthorized ? <Navigate to="/home" /> : <></>}
    </div>
  );
}
