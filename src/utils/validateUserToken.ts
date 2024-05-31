import { UserLoginResponse, UserTokenRequest } from "../vite-env";

export default async function validateUserToken(
  request: UserTokenRequest
): Promise<boolean> {
  const url: string = "http://localhost:8080/api/v1/auth/validate";
  const response: Response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request)
  });

  const userLoginResponse: UserLoginResponse = await response.json();
  return userLoginResponse?.success;
}
