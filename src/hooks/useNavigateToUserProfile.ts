import { useNavigate } from "react-router-dom";
import useLocalStorage from "./useLocalStorage";

export default function useNavigateToUserProfile() {
  const navigate = useNavigate();
  const [currentUserId] = useLocalStorage("user_id", "");

  return (userId: number) => {
    if (currentUserId === userId) {
      navigate("/me");
    } else {
      navigate(`/user/${userId}`);
    }
  };
}
