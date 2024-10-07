import { createContext, ReactNode, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type AuthContextValue = {
  jwt: string;
  setJwt: (jwt: string) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext is undefined. Wrap component inside AuthContext.Provider");
  return context;
};

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [jwt, setJwt] = useLocalStorage("jwt"); // Przechowujemy stan użytkownika

  return <AuthContext.Provider value={{ jwt, setJwt }}>{children}</AuthContext.Provider>;
}
