/// <reference types="vite/client" />

export type UserTokenRequest = {
  username: string,
  jwt: string
}

export type UserTokenRespnse = {
  login: {
    userId: number;
    username: string;
    jwt: string;
  };

  code: string;
  message: string;
  success: boolean;
};

export type UserLoginResponse = {
  
  login: {
    userId: number,
    username: string,
    jwt: string
  }

  code: string,
  message: string,
  success: boolean
}


export type SearchUsersResponse = {
  users: SearchUsersList,
  code: string,
  message?: string,
  success: boolean
} 

export type SearchUsersList = {
  userId: number;
  firstName: string;
  lastName: string;
  profilePicture: Uint8Array | null;
}[] | null;