import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import usePostService from "../../services/usePostService";
import { PostNotification } from "../../types/post.types";

export default function useFetchAndSubscribePostNotifications() {
  const [jwt] = useLocalStorage("jwt");
  const postService = usePostService();
  const [postNotifications, setPostNotifications] = useState<PostNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    postService
      .findPostNotifications()
      .then((response) => {
        if (response.success) {
          setPostNotifications(response.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const URL = `http://localhost:8080/api/v1/post/notification/subscribe?jwt=${jwt}`;

  useEffect(() => {
    const eventSource = new EventSource(URL);

    eventSource.onmessage = (event) => {
      setPostNotifications((prev) => [...prev, event.data]);
    };

    eventSource.onerror = (event) => {
      console.error(event);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return { postNotifications, loading };
}
