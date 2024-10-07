import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import useAuthService from "../../services/useAuthService";

export default function useLogout() {
  const { jwt, setJwt } = useAuthContext();
  const { logout } = useAuthService();
  const [username] = useLocalStorage("username");
  const navigate = useNavigate();

  return () => {
    window.localStorage.clear();
    logout({ jwt, username });
    setJwt("");
    navigate("/login");
  };
}
