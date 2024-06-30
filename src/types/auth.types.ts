export interface LoginRequest {
  username: string,
  password: string
};

export interface LoginResponse {
  login: {
    userId: number;
    username: string;
    jwt: string;
  };

  code: string;
  message: string;
  success: boolean;
};

export interface LoginTokenRequest {
  username: string;
  jwt: string;
};


