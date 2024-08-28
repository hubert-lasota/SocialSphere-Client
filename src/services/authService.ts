import { LoginRequest, LoginResponse, LoginTokenRequest } from "../types/auth.types";
import { DataResult } from "../types/common.types";
import fetchService from "./fetchService";

const url: string = "http://localhost:8080/api/v1/auth";
const applicationJsonHeader: [string, string] = ["Content-Type", "application/json"];

interface AuthService {
  login: (credentials: LoginRequest) => Promise<DataResult<LoginResponse>>;
  validateUserToken: (userToken: LoginTokenRequest) => Promise<DataResult<LoginResponse>>;
}

function login(credentials: LoginRequest): Promise<DataResult<LoginResponse>> {
  const finalUrl = url + "/login";
  return fetchService.post(finalUrl, credentials, undefined, [applicationJsonHeader]) as Promise<DataResult<LoginResponse>>;
}

function validateUserToken(userToken: LoginTokenRequest): Promise<DataResult<LoginResponse>> {
  const finalUrl: string = url + "/validate";
  return fetchService.post(finalUrl, userToken, undefined, [applicationJsonHeader]) as Promise<DataResult<LoginResponse>>;
}

const authService: AuthService = { login: login, validateUserToken: validateUserToken };

export default authService;
