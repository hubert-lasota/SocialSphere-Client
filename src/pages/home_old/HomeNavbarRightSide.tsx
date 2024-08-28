import { useEffect, useState } from "react";
import userService from "../../services/userService";
import { useNavigate } from "react-router-dom";
import css from "./home.module.css";

export default function HomeNavbarRightSide() {
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const navigate = useNavigate();

  async function handleFetchUserProfilePicture() {
    const response = await userService.getLoggedInUserProfilePicutre();
    if(response.success) {
      const pic = `data:image/png;base64, ${response.data}`;
      setProfilePictureUrl(pic)
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
    <div className={css["nav__right-side"]}>
      <img src={profilePictureUrl} onClick={() => handleGoOnMyPage()} className={css["nav__right-side__img"]}/>
    </div>
  );
}
