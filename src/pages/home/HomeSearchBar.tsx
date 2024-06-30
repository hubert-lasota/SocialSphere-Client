import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../../hooks/useLocalStorage";
import { SearchUsers } from "../../types/user.types";
import userService from "../../services/userService";

export default function HomeSearchBar() {
  const [inputString, setInputString] = useState("");
  const [inputStringOnFocus, setInputStringOnFocus] = useState("");
  const [searchedUsers, setSearchedUsers] = useState<SearchUsers[]>([
    { userId: -1, firstName: "", lastName: "", profilePicture: null },
  ]);
  const [userId] = useLocalStorage("user_id", "");
  const [jwt] = useLocalStorage("jwt", "");
  const [isSearchUsersListVisible, setIsSearchUsersListVisible] =
    useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

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
    if (inputString) {
      handleSearchFriends(inputString);
      setIsSearchUsersListVisible(true);
      inputRef.current?.classList.add(
        "search-bar__input--no-bdr-btm",
        "search-bar__input--bg-white"
      );
    } else {
      setIsSearchUsersListVisible(false);
    }
  }, [inputString]);

  function handleClickOutsideSearchBar(event: MouseEvent) {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsSearchUsersListVisible(false);
      setInputString("");
      setSearchedUsers([]);
      inputRef.current?.classList.remove(
        "search-bar__input--no-bdr-btm",
        "search-bar__input--bg-white"
      );
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

  return (
    <div className="home__search-bar">
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        size="lg"
        className="search-bar__icon search-bar__icon--navy"
      />
      <input
        className="search-bar__input search-bar__input--bg-grey search-bar__input--fsmedium"
        ref={inputRef}
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
        <div className="search-bar__user-list search-bar__user-list--bg-white">
          {searchedUsers.map((u) => {
            let profilePictureUrl = "src/assets/favicon.png";
            if (u.profilePicture) {
              profilePictureUrl = `data:image/png;base64,${u.profilePicture}`;
            }
            const uniqueKey = uuidv4();
            return (
              <div key={uniqueKey} className="user-list__line ">
                <img src={profilePictureUrl} className="user-list__line-img " />
                <div className="user-list__line-name">
                  <p className="user-list__line-text">{u.firstName}</p>
                  <p className="user-list__line-text">{u.lastName}</p>
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
