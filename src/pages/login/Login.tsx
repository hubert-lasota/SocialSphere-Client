import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
          <p>Join Social Sphere today! </p>
          <p>Create your account with just a few details</p>
        </div>
        <button className={`${css["sign-up__btn"]}`} onClick={() => navigate("/sign-up")}>
          SIGN UP
        </button>
      </div>

      <LoginForm isWarning={isWarning} handleSignIn={handleSignIn} />
      {isAuthorized ? <Navigate to="/home" /> : <></>}
    </div>
  );
}
