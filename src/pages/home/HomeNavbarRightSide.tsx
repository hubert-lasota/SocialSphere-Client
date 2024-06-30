import { useEffect, useState } from "react";
import userService from "../../services/userService";

export default function HomeNavbarRightSide() {
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

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

  return (
    <div className="home__nav-right">
      <img src={profilePictureUrl} />
    </div>
  );
}
