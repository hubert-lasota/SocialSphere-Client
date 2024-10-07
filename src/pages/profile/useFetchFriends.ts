import { useCallback, useEffect, useRef, useState } from "react";
import useIsCurrentUser from "../../hooks/useIsCurrentUser";
import useUserService from "../../services/useUserService";
import { UserWithProfile } from "../../types/user.types";

export default function useFetchFriends(userId: number) {
  const isCurrentUser = useIsCurrentUser(userId);
  const page = useRef<number>(0);
  const isLast = useRef<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [friends, setFriends] = useState<UserWithProfile[]>([]);
  const userService = useUserService();

  // isFirstFetch to handle react re-render
  const fetchFriendsPage = useCallback(
    (page: number, isFirstFetch: boolean) => {
      setLoading(true);
      let promise;
      if (isCurrentUser) {
        promise = userService.findMyFriends(page, 10);
      } else {
        promise = userService.findUserFriends(userId, page, 10);
      }

      promise
        .then((response) => {
          if (response.success) {
            const pageResponse = response.data;
            isLast.current = pageResponse.last;
            if (isFirstFetch) {
              setFriends(pageResponse.content);
            } else {
              setFriends([...friends, ...pageResponse.content]);
            }
          }
        })
        .finally(() => setLoading(false));
    },
    [userId]
  );

  useEffect(() => {
    fetchFriendsPage(0, true);
  }, [userId]);

  const fetchNextPage = () => {
    if (isLast.current) return;
    page.current++;
    fetchFriendsPage(page.current, false);
  };

  return { friends, loading, fetchNextPage };
}
