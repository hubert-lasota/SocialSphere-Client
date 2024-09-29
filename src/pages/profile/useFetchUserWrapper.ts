import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { UserWrapper } from "../../types/user.types";

export default function useFetchUserWrapper(userId: number) {
  const [userWrapper, setUserWrapper] = useState<UserWrapper>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    userService
      .findUser(userId)
      .then((response) => {
        if (response.success) {
          setUserWrapper(response.data);
        }
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { userWrapper, loading };
}
