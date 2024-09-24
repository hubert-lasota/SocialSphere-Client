import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import userService from "../../services/userService";
import { FriendRequestResponse } from "../../types/user.types";

export default function useFetchAndSubscribeFriendRequestNotifications() {
  const [jwt] = useLocalStorage("jwt", "");
  const [friendNotifications, setFriendNotifications] = useState<FriendRequestResponse[]>([]);
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

  const URL = `http://localhost:8080/api/v1/user/friend/notification/subscribe?jwt=${jwt}`;

  useEffect(() => {
    const eventSource = new EventSource(URL);

    eventSource.onmessage = (event) => {
      setFriendNotifications((prev) => [...prev, event.data]);
    };

    eventSource.onerror = (event) => {
      console.error(event);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return { friendNotifications, loading };
}
