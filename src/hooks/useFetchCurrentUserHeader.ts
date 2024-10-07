import { useEffect, useState } from "react";
import useUserService from "../services/useUserService";
import { UserHeader } from "../types/user.types";

const initialCurrentUser: UserHeader = {
  userId: 1,
  firstName: "",
  lastName: "",
  profilePicture: null,
  relationshipStatus: "YOU",
};

export default function useFetchCurrentUserHeader() {
  const [currentUser, setCurrentUser] = useState<UserHeader>(initialCurrentUser);
  const [loading, setLoading] = useState<boolean>(true);
  const userService = useUserService();

  const fetchCurrentUserHeader = () => {
    setLoading(true);
    userService
      .getLoggedInUserHeader()
      .then((response) => {
        if (response.success) {
          setCurrentUser(response.data);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCurrentUserHeader();
  }, []);

  return { currentUser, loading };
}
