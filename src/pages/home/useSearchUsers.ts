import { useState } from "react";
import useUserService from "../../services/useUserService";
import { UserHeader } from "../../types/user.types";
import debounce from "../../utils/debounce";

export default function useSearchusers() {
  const [foundUsers, setFoundUsers] = useState<UserHeader[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const userService = useUserService();

  const searchUsers = debounce((containsString: string) => {
    setLoading(true);
    userService
      .searchUsers(containsString, 5)
      .then((response) => {
        if (response.success) {
          setFoundUsers(response.data);
        } else {
          setFoundUsers([]);
        }
      })
      .finally(() => setLoading(false));
  }, 500);

  return { foundUsers, setFoundUsers, loading, searchUsers };
}
