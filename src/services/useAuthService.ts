import { LoginRequest, LoginResponse, LoginTokenRequest } from "../types/auth.types";
import { DataResult } from "../types/common.types";
import useFetchService from "./useFetchService";

interface AuthService {
  login: (credentials: LoginRequest) => Promise<DataResult<LoginResponse>>;
  logout: (userToken: LoginTokenRequest) => Promise<DataResult<any>>;
  createLogin: (credentials: LoginRequest) => Promise<DataResult<LoginResponse>>;
  validateUserToken: (userToken: LoginTokenRequest) => Promise<DataResult<LoginResponse>>;
}

export default function useAuthServie(): AuthService {
  const { post } = useFetchService();
  const URL: string = "http://localhost:8080/api/v1/auth";

  const login = (credentials: LoginRequest) => {
    const finalUrl = URL + "/login";
    return post(finalUrl, credentials);
  };

  
  const logout = (userToken: LoginTokenRequest) => {
    const finalUrl = URL + "/logout";
    return post(finalUrl, userToken);
  };


  const validateUserToken = (userToken: LoginTokenRequest) => {
    const finalUrl: string = URL + "/validate";
    return post(finalUrl, userToken) as Promise<DataResult<LoginResponse>>;
  };

  const createLogin = (credentials: LoginRequest) => {
    const finalUrl: string = URL + "/create";

    return post(finalUrl, credentials);
  };

  return { login, logout, createLogin, validateUserToken };
}
