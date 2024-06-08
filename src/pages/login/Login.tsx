import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import useLocalStorage from "../../hooks/useLocalStorage";
import "../../styles/login.css";
import Button from "../../components/Button";
import { UserTokenRespnse } from "../../vite-env";
import FetchBuilder from "../../utils/FetchBuilder";

export default function Login() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [, setJwtItem] = useLocalStorage("jwt", "");
  const [, setUserIdItem] = useLocalStorage("user_id", "");
  const [, setUsernameItem] = useLocalStorage("username", "");
  const [isWarning, setIsWarning] = useState(false);

  async function handleSignIn(username: string, password: string) {
    const url: string = "http://localhost:8080/api/v1/auth/login";

    try {
      const builder = new FetchBuilder();
      const response = await builder
        .post(url)
        .body({ username: username, password: password })
        .applicationJson()
        .fetch();

      let user: UserTokenRespnse | null = null;

      if (response.ok) {
        user = await response.json();
      }

      if (user?.success) {
        setIsAuthorized(true);
        setJwtItem(user.login.jwt);
        setUserIdItem(user.login.userId);
        setUsernameItem(user.login.username);
      } else {
        setIsAuthorized(false);
        setIsWarning(true);
      }
    } catch (error) {
      setIsAuthorized(false);
      console.log("Error occured while login", error);
    }
  }

  return (
    <div className="login">
      <div className="login__sign-up">
        <div className="sign-up__header sign-up__header--fwhite sign-up__header--fslarge">
          <p>Register with username and password</p>
          <p>to be able to use Social Sphere</p>
        </div>
        <Button
          className="sign-up__btn sign-up__btn--white sign-up__btn--fsmd"
          text="SIGN UP"
        />
      </div>

      <LoginForm isWarning={isWarning} handleSignIn={handleSignIn} />
      {isAuthorized ? <Navigate to="/home" /> : <></>}
    </div>
  );
}
