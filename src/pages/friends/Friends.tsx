import { useEffect, useRef, useState } from "react";
import useUserService from "../../services/useUserService";
import { SearchFriendsRequest, UserWithProfile } from "../../types/user.types";
import css from "./friends.module.css";
import Header from "./Header";
import Main from "./Main";

export default function Friends() {
  const [friends, setFriends] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const page  = useRef<number>(0);
  const isLastPage = useRef<boolean>(false);
  const userService = useUserService();
  const [searchFriendsRequest, setSerchFriendsRequest] = useState<SearchFriendsRequest | undefined>(undefined);

  const handleSearchFriends = (searchFriendsRequest: SearchFriendsRequest) => {
    setSerchFriendsRequest(searchFriendsRequest);
  };

  const fetchFriends = (isNextFetch = false) => {
    if(!searchFriendsRequest) return;

    setLoading(true);
    userService
      .searchFriends(searchFriendsRequest, page.current, 15)
      .then((response) => {
        if (response.success) {
          const content = response.data.content;
          if(isNextFetch) setFriends([...friends, ...content])
          else setFriends(content);
          isLastPage.current = response.data.last;
        } else {
          setFriends([])
        }
        isLastPage.current = true;
      })
      .finally(() => setLoading(false));
  }

  const handleFetchNextFriendsPage = () => {
    if(isLastPage.current) return;
    page.current++;
    fetchFriends();
  } 

  useEffect(() => {
    fetchFriends();
  }, [searchFriendsRequest]);

  return (
    <div className={css["friends"]}>
      <Header onSearchFriends={handleSearchFriends}/>
      <Main friends={friends} loading={loading} onFetchNextFriendsPage={handleFetchNextFriendsPage}/>
    </div>
  );
}
