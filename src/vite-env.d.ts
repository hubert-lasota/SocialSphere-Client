/// <reference types="vite/client" />

export type UserTokenRequest = {
  username: string,
  jwt: string
}

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