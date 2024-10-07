import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import useUserService from "../../services/useUserService";
import { UserWrapper } from "../../types/user.types";

export default function useFetchUserWrapper(userId: number) {
  const [userWrapper, setUserWrapper] = useState<UserWrapper>();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUserId] = useLocalStorage("user_id");
  const userService = useUserService();

  useEffect(() => {
    setLoading(true);
    let promise;
    if (currentUserId === userId) {
      promise = userService.getLoggedInUser();
    } else {
      promise = userService.findUser(userId);
    }
    promise
      .then((response) => {
        if (response.success) {
          setUserWrapper(response.data);
        }
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { userWrapper, loading };
}
