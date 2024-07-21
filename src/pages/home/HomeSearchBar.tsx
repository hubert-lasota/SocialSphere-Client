import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import { RelationshipStatus, SearchUsers } from "../../types/user.types";
import css from "./home.module.css";

export default function HomeSearchBar() {
  const [inputString, setInputString] = useState("");
  const [inputStringOnFocus, setInputStringOnFocus] = useState("");
  const [searchedUsers, setSearchedUsers] = useState<SearchUsers[]>([
    { userId: -1, firstName: "", lastName: "", profilePicture: null, relationshipStatus: "YOU" },
  ]);
  const [isSearchUsersListVisible, setIsSearchUsersListVisible] = useState(false);

  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const userListRef = useRef<HTMLDivElement>(null);

  async function handleSearchFriends(searchInputString: string) {
    const maxSize = "5";
    const users = await userService.searchUsers(searchInputString, maxSize);
    if (users && users.users) {
      setSearchedUsers(users.users);
    } else {
      setIsSearchUsersListVisible(false);
    }
  }

  useEffect(() => {
    if (inputString && inputString.length > 0) {
      handleSearchFriends(inputString);
      setIsSearchUsersListVisible(true);
      inputRef.current?.classList.add(css["search-bar__input--no-bdr-btm"], css["search-bar__input--bg-white"]);
    } else {
      setIsSearchUsersListVisible(false);
      inputRef.current?.classList.remove(css["search-bar__input--no-bdr-btm"], css["search-bar__input--bg-white"]);
    }
  }, [inputString]);

  function handleClickOutsideSearchBar(event: MouseEvent) {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target as Node) &&
      userListRef.current &&
      !userListRef.current.contains(event.target as Node)
    ) {
      setIsSearchUsersListVisible(false);
      setInputString("");
      setSearchedUsers([]);
      inputRef.current?.classList.remove(css["search-bar__input--no-bdr-btm"], css["search-bar__input--bg-white"]);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSearchBar);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearchBar);
    };
  }, []);

  function handleInputFocus() {
    setInputString(inputStringOnFocus);
  }

  function handleGoOnUserProfile(userId: number, relationshipStatus: RelationshipStatus) {
    if (relationshipStatus === "YOU") {
      navigate("/me");
    } else {
      navigate(`/user/${userId}`);
    }
  }

  return (
    <div className={css["home__search-bar"]}>
      <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" className={`${css["search-bar__icon"]}`} />
      <input
        ref={inputRef}
        className={`${css["search-bar__input"]}`}
        placeholder="Search friends"
        type="text"
        value={inputString}
        onChange={(e) => {
          setInputString(e.target.value);
          setInputStringOnFocus(e.target.value);
        }}
        onFocus={() => handleInputFocus()}
      />

      {searchedUsers && isSearchUsersListVisible ? (
        <div ref={userListRef} className={`${css["search-bar__user-list"]}`}>
          {searchedUsers.map((u) => {
            let profilePictureUrl: string;
            if (u.profilePicture) {
              profilePictureUrl = `data:image/png;base64,${u.profilePicture}`;
            } else {
              profilePictureUrl = "src/assets/favicon.png";
            }
            return (
              <div
                key={u.userId}
                className={css["user-list__line"]}
                onClick={() => handleGoOnUserProfile(u.userId, u.relationshipStatus)}
              >
                <img src={profilePictureUrl} className={css["user-list__line__img"]} />
                <div className={css["user-list__line__details"]}>
                  <div className={css["line__details__name"]}>
                    <p className={css["details__name__text"]}>{u.firstName}</p>
                    <p className={css["details__name__text"]}>{u.lastName}</p>
                  </div>
                  <div className={`${css["line__details__relationship-status"]}`}>{u.relationshipStatus}</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
