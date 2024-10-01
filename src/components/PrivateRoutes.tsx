import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import useAuthServie from "../services/useAuthService";
import { LoginTokenRequest } from "../types/auth.types";
import Loading from "./loading/Loading";

export default function PrivateRoutes() {
  const [jwtItem] = useLocalStorage("jwt");
  const [usernameItem] = useLocalStorage("username", "");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const authService = useAuthServie();

  async function checkIsAuthorized() {
    const userToken: LoginTokenRequest = { username: usernameItem, jwt: jwtItem };
    const loginResponse = await authService.validateUserToken(userToken);
    if (loginResponse.success) {
      setIsAuthorized(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    checkIsAuthorized();
  }, []);

  if (loading) {
    return <Loading pageLoading={true} />;
  }

  return isAuthorized ? <Outlet /> : <Navigate to="/login" />;
}
