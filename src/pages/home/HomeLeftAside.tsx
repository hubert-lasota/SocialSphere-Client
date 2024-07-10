import { faPeopleLine } from "@fortawesome/free-solid-svg-icons/faPeopleLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { UserResponse } from "../../types/user.types";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";

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
    <aside className={`${styles["home__left-aside"]} ${styles["home__left-aside--bgcolor-white"]}`}>
      <div className={styles["left-aside__user-line"]} onClick={() => handleGoOnMyProfile()}>
        <img
          src={profilePictureUrl}
          alt="profile"
          className={styles["left-aside__user-line__profile-picture"]}
        />
        <div className={styles["left-aside__user-line__name"]}>
          <span className={`${styles["left-aside__user-line__name__first-name"]} ${styles["left-aside__user-line__name__first-name--fsmd"]}`}>
            {firstName}
          </span>
          <span className={`${styles["left-aside__user-line__name__last-name"]} ${styles["left-aside__user-line__name__last-name--fsmd"]}`}>
            {lastName}
          </span>
        </div>
      </div>
      <div className={styles["left-aside__find-friends"]} onClick={() => handleGoOnFindFriends()}>
        <FontAwesomeIcon icon={faPeopleLine} size="2x"/>
        <span className={`${styles["left-aside__find-friends__text"]} ${styles["left-aside__find-friends__text--fsmd"]}`}>
          FIND FRIENDS
        </span>
      </div>
    </aside>
  );
}
