import { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import useLocalStorage from "../../hooks/useLocalStorage";
import "../../styles/login.css";
import authService from "../../services/authService";
import { LoginResponse } from "../../types/auth.types";

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
    <div className="login">
      <div className="login__sign-up">
        <div className="sign-up__header sign-up__header--fwhite sign-up__header--fslarge">
          <p>Register with username and password</p>
          <p>to be able to use Social Sphere</p>
        </div>
        <button className="sign-up__btn sign-up__btn--white sign-up__btn--fsmd">
          SIGN UP
        </button>
      </div>

      <LoginForm isWarning={isWarning} handleSignIn={handleSignIn} />
      {isAuthorized ? <Navigate to="/home" /> : <></>}
    </div>
  );
}
