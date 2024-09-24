import { useState } from "react";
import { Navigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import authService from "../../services/authService";
import { LoginResponse } from "../../types/auth.types";
import { DataResult } from "../../types/common.types";
import css from "./login.module.css";
import LoginForm from "./LoginForm";

export default function Login() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [, setJwtItem] = useLocalStorage("jwt", "");
  const [, setUserIdItem] = useLocalStorage("user_id", "");
  const [, setUsernameItem] = useLocalStorage("username", "");
  const [isWarning, setIsWarning] = useState(false);

  async function handleSignIn(username: string, password: string) {
    const response: DataResult<LoginResponse> = await authService.login({
      username: username,
      password: password,
    });

    if (response?.success) {
      const { userId, username, jwt } = response.data;
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
    <div className={css["login"]}>
      <div className={css["login__sign-up"]}>
        <div className={`${css["sign-up__header"]}`}>
          <p>Register with username and password</p>
          <p>to be able to use Social Sphere</p>
        </div>
        <button className={`${css["sign-up__btn"]}`}>SIGN UP</button>
      </div>

      <LoginForm isWarning={isWarning} handleSignIn={handleSignIn} />
      {isAuthorized ? <Navigate to="/home" /> : <></>}
    </div>
  );
}
