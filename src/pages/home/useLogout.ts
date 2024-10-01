import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();
  return () => {
    window.localStorage.clear();
    navigate("/login");
  };
}
