import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import useUserService from "../../services/useUserService";
import { FriendNotification } from "../../types/user.types";

export default function useFetchAndSubscribeFriendRequestNotifications() {
  const { jwt } = useAuthContext();
  const userService = useUserService();
  const [friendNotifications, setFriendNotifications] = useState<FriendNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    userService
      .findCurrentUserFriendNotifications()
      .then((response) => {
        if (response.success) {
          setFriendNotifications(response.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  
  useEffect(() => {
    const URL = `http://localhost:8080/api/v1/user/friend/notification/subscribe?jwt=${jwt}`;
    const eventSource = new EventSource(URL);

    eventSource.onmessage = (event) => {
      setFriendNotifications((prev) => [...prev, JSON.parse(event.data)]);
    };

    eventSource.onerror = (event) => {
      console.error(event);
    };

    return () => {
      eventSource.close();
    };
  }, [jwt]);

  return { friendNotifications, loading };
}
