import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import { UserResponse } from "../../types/user.types";
import css from "./profile.module.css";
import ProfileHeader from "./ProfileHeader";
import ProfileHeaderButton from "./ProfileHeaderButton";
import ProfileLeftAside from "./ProfileLeftAside";
import ProfileMain from "./ProfileMain";

export default function MyProfile() {
  const [user, setUser] = useState<UserResponse>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [isShowPost, setIsShowPosts] = useState<boolean>(true);
  const [isShowFriends, setIsShowFriends] = useState<boolean>(false);
  const [isMoreAbout, setIsMoreAbout] = useState<boolean>(false);
  const [isSettings, setIsSettings] = useState<boolean>(false);
  const navigate = useNavigate();

  async function fetchLoggedInUser() {
    const response: UserResponse = await userService.getLoggedInUser();
    if (response && response.success) {
      setUser(response);
      const { userProfile } = response;
      setFirstName(userProfile.firstName);
      setLastName(userProfile.lastName);
      const profilePicUrl = userProfile.profilePicture
        ? `data:image/jpg;base64,${userProfile.profilePicture}`
        : "/src/assets/default-profile-picture.png";
      setProfilePictureUrl(profilePicUrl);
    }
  }

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  function handleGoOnHomePage() {
    navigate("/home");
  }

  return (
    <div className={`${css["profile"]}`}>
      <ProfileHeader firstName={firstName} lastName={lastName} profilePictureUrl={profilePictureUrl}>
        <ProfileHeaderButton text="Go to home page" handleClick={handleGoOnHomePage} />
      </ProfileHeader>
      <ProfileMain
        user={user as UserResponse}
        isShowPosts={isShowPost}
        isShowFriends={isShowFriends}
        isMoreAbout={isMoreAbout}
        isMoreAboutEditable={true}
        isSettings={isSettings}
      />
      <ProfileLeftAside
        handleSetIsShowPosts={setIsShowPosts}
        handleSetIsShowFriends={setIsShowFriends}
        handleSetIsMoreAbout={setIsMoreAbout}
        isSettingsComponentAvailable={true}
        handleSetIsSettings={setIsSettings}
      />
    </div>
  );
}
