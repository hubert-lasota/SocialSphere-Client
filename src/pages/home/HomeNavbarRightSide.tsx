import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";

export default function HomeNavbarRightSide() {
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const navigate = useNavigate();

  async function handleFetchUserProfilePicture() {
    const profilePicUrl = await userService.getLoggedInUserProfilePicutreUrl();
    if(profilePicUrl) {
      setProfilePictureUrl(profilePicUrl)
    } else {
      setProfilePictureUrl("src/assets/default-profile-picture.png");
    }
  }

  useEffect(() => {
    handleFetchUserProfilePicture();
  }, []);

  function handleGoOnMyPage() {
    navigate("/me")
  }

  return (
    <div className={styles["nav__right-side"]}>
      <img src={profilePictureUrl} onClick={() => handleGoOnMyPage()} className={styles["nav__right-side__img"]}/>
    </div>
  );
}
