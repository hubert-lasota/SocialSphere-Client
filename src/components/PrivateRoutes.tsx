import React, { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { UserTokenRequest } from "../vite-env";
import validateUserToken from "../utils/validateUserToken";
import { Outlet, Navigate } from "react-router-dom";
import Home from "../pages/home/Home";
import Loading from "../pages/Loading";

export default function PrivateRoutes() {
  const [jwtItem, setJwtItem] = useLocalStorage("jwt", "");
  const [usernameItem, setUsernameItem] = useLocalStorage("username", "");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  async function checkIsAuthorized() {
    let userToken: UserTokenRequest = { username: usernameItem, jwt: jwtItem };
    const isAuth: boolean = await validateUserToken(userToken);
    setIsAuthorized(isAuth);
    setLoading(false);
  }

  useEffect(() => {
    checkIsAuthorized();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return isAuthorized ? <Home /> : <Navigate to="/login" />;
}
