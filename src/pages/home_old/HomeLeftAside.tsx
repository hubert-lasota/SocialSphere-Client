import { faPeopleLine } from "@fortawesome/free-solid-svg-icons/faPeopleLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { UserWrapper } from "../../types/user.types";
import { useNavigate } from "react-router-dom";
import css from "./home.module.css";
import { DataResult } from "../../types/common.types";

export default function HomeLeftAside() {
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  
  const navigate = useNavigate();

  async function handleFetchMyUserDetails() {
    const response: DataResult<UserWrapper> = await userService.getLoggedInUser();
    if(response?.success) {
      const data: UserWrapper = response.data; 
      if(data.userProfile.profilePicture) {
        const profilePicUrl = `data:image/png;base64,${data.userProfile.profilePicture}`;
        setProfilePictureUrl(profilePicUrl);
      } else {
        setProfilePictureUrl("src\assets\default-profile-picture.png");
      }

      const fn = data.userProfile.firstName;
      const ln = data.userProfile.lastName;
      setFirstName(fn);
      setLastName(ln);
    }
  }

  useEffect(() => {
    handleFetchMyUserDetails();
  });
  
  function handleGoOnMyProfile() {
    navigate("/me")
  }

  function handleGoOnFindFriends() {
    navigate("/friends");
  }

  return (
    <aside className={`${css["home__left-aside"]}`}>
      <div className={css["left-aside__user-line"]} onClick={() => handleGoOnMyProfile()}>
        <img
          src={profilePictureUrl}
          alt="profile"
          className={css["left-aside__user-line__profile-picture"]}
        />
        <div className={css["left-aside__user-line__name"]}>
          <span className={`${css["left-aside__user-line__name__first-name"]}`}>
            {firstName}
          </span>
          <span className={`${css["left-aside__user-line__name__last-name"]}`}>
            {lastName}
          </span>
        </div>
      </div>
      <div className={css["left-aside__find-friends"]} onClick={() => handleGoOnFindFriends()}>
        <FontAwesomeIcon icon={faPeopleLine} size="2x"/>
        <span className={`${css["left-aside__find-friends__text"]}`}>
          FIND FRIENDS
        </span>
      </div>
    </aside>
  );
}
