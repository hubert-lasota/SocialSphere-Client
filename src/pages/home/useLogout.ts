import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export default function useLogout() {
  const { setJwt } = useAuthContext();
  const navigate = useNavigate();
  
  return () => {
    window.localStorage.clear();
    setJwt("");
    navigate("/login");
  };
}
