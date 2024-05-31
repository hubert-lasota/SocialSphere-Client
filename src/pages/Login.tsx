import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import useLocalStorage from "../hooks/useLocalStorage";
import "../styles/login.css"

type UserTokenRespnse = {
  login: {
    userId: number;
    username: string;
    jwt: string;
  };

  code: string;
  message: string;
  success: boolean;
};

export default function Login() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [, setJwtItem] = useLocalStorage("jwt", "");
  const [, setUserIdItem] = useLocalStorage("user_id", "");
  const [, setUsernameItem] = useLocalStorage("username", "");
  const [isWarning, setIsWarning] = useState(false);

  async function login(
    username: string,
    password: string,
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    const url: string = "http://localhost:8080/api/v1/auth/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      let user: UserTokenRespnse | null = null;
   
      if (response.ok) {
        user = await response.json();
      }
      
      if (user?.success) {
        console.log(user)
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
      <div className="login-sign-up">
        <div className="login-sign-up-header">
          <p>Register with username and password</p>
          <p>to be able to use Social Sphere</p>
        </div>
        <button>SIGN UP</button>
      </div>

      <LoginForm isWarning={isWarning} login={login} />
      {isAuthorized ? <Navigate to="/home" /> : <></>}
    </div>
  );
}
