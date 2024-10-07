import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import Loading from "../../components/loading/Loading";
import useNavigateToUserProfile from "../../hooks/useNavigateToUserProfile";
import getUserProfileImgSrc from "../../utils/getUserProfileImgSrc";
import css from "./home.module.css";
import useSearchusers from "./useSearchUsers";

export default function SearchBar() {
  const { foundUsers, setFoundUsers, loading, searchUsers } = useSearchusers();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const navigateToUserProfile = useNavigateToUserProfile();
  const [inputValue, setInputValue] = useState<string>("");
  const searchBarClickedRef = useRef<HTMLDivElement>(null);


  const handleInputChange = (value: string) => {
    setInputValue(value);
    searchUsers(value);
  };

  const clickCloseBtn = () => {
    setFoundUsers([]);
    setInputValue("");
    setIsClicked(false);
  };

  useEffect(() => {
    if (isClicked) {
      const handleClickOutsideClickedSearchBar = (e: MouseEvent) => {
        if (searchBarClickedRef.current && !searchBarClickedRef.current.contains(e.target as Node)) {
          setIsClicked(false);
        }
      };

      const timeoutId = setTimeout(() => {
        document.addEventListener("click", handleClickOutsideClickedSearchBar);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("click", handleClickOutsideClickedSearchBar);
      };
    }
  }, [isClicked]);

  return (
    <>
      {isClicked ? (
        <div className={css["search-bar__clicked"]} ref={searchBarClickedRef}>
          <div className={css["search-bar__clicked__header"]}>
            <div className={css["search-bar__clicked__icon"]}>
              <CiSearch />
            </div>
            <input
              className={css["search-bar__clicked__header__input"]}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Search..."
            />
            <div className={css["search-bar__clicked__header__close-btn"]} onClick={clickCloseBtn}>
              <IoCloseSharp />
            </div>
          </div>
          {inputValue && (
            <div className={css["search-bar__clicked__result"]}>
              {loading ? (
                <Loading />
              ) : (
                foundUsers.map((user) => {
                  return (
                    <div key={user.userId} className={css["search-bar__clicked__result__single-result"]}>
                      <img src={getUserProfileImgSrc(user.profilePicture)} alt="profile" onClick={() => navigateToUserProfile(user.userId)} />
                      <div className={css["search-bar__clicked__result__single-result__details"]}>
                        <span>
                          {user.firstName} {user.lastName}
                        </span>
                        <span className={css["search-bar__clicked__result__single-result__details__status"]}>{user.relationshipStatus}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      ) : (
        <div className={css["search-bar__no-clicked"]} onClick={() => setIsClicked(true)}>
          <div className={css["search-bar__no-clicked__icon"]}>
            <CiSearch />
          </div>
          <div className={css["search-bar__no-clicked__text"]}>Search for people!</div>
        </div>
      )}
    </>
  );
}
