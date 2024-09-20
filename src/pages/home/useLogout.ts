import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();

  return () => {
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("jwt");
    navigate("/login");
  };
}
