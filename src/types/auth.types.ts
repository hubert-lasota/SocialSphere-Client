export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  username: string;
  jwt: string;
}

export interface LoginTokenRequest {
  username: string;
  jwt: string;
}
