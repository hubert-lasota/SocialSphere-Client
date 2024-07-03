import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Navigate, Outlet } from "react-router-dom";
import Home from "../pages/home/Home";
import Loading from "./Loading";
import "../styles/loading.css";
import { LoginTokenRequest } from "../types/auth.types";
import authService from "../services/authService";

export default function PrivateRoutes() {
  const [ jwtItem ] = useLocalStorage("jwt", "");
  const [ usernameItem ] = useLocalStorage("username", "");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  async function checkIsAuthorized() {
    const userToken: LoginTokenRequest = { username: usernameItem, jwt: jwtItem };
    const loginResponse = await authService.validateUserToken(userToken);
    if(loginResponse.success) {
      setIsAuthorized(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    checkIsAuthorized();
  }, []);

  if (loading) {
    return <Loading className="spinner"/>;
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
}
