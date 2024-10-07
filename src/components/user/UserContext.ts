import { createContext, useContext } from "react";
import { UserWithProfile } from "../../types/user.types";


type UserContextValue = {
  userWithProfile: UserWithProfile
};

export const UserContext = createContext<UserContextValue | undefined>(undefined);

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext is undefined. It needs to be wrapped in UserContext.Provider");
  }

  return context;
}
