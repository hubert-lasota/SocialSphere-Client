import { faPeopleLine } from "@fortawesome/free-solid-svg-icons/faPeopleLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { UserResponse } from "../../types/user.types";
import { useNavigate } from "react-router-dom";

export default function HomeLeftAside() {
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  
  const navigate = useNavigate();

  async function handleFetchMyUserDetails() {
    const response: UserResponse = await userService.getLoggedInUser();
    if(response?.success) {
      if(response.userProfile.profilePicture) {
        const profilePicUrl = `data:image/png;base64,${response.userProfile.profilePicture}`;
        setProfilePictureUrl(profilePicUrl);
      } else {
        setProfilePictureUrl("src\assets\default-profile-picture.png");
      }

      const fn = response.userProfile.firstName;
      const ln = response.userProfile.lastName;
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
    <aside className="home__left-aside">
      <div className="home__left-aside__user-line" onClick={() => handleGoOnMyProfile()}>
        <img
          src={profilePictureUrl}
          alt="profile"
          className="left-aside__user-line_profile-picture"
        />
        <div className="left-aside__user-line-name">
          <span className="left-aside__user-line-first-name left-aside__user-line-first-name--fsmd">
            {firstName}
          </span>
          <span className="left-aside__user-line-last-name left-aside__user-line-last-name--fsmd">
            {lastName}
          </span>
        </div>
      </div>
      <div className="home__left-aside__find-friends" onClick={() => handleGoOnFindFriends()}>
        <FontAwesomeIcon icon={faPeopleLine} size="3x"/>
        <span className="left-aside__find-friends-text left-aside__find-friends-text--fsmd">
          FIND FRIENDS
        </span>
      </div>
    </aside>
  );
}
