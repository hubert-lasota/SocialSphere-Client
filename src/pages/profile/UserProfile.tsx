import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../../services/userService";
import { RelationshipStatus, UserResponse } from "../../types/user.types";
import styles from "./profile.module.css";
import ProfileHeader from "./ProfileHeader";
import ProfileHeaderButton from "./ProfileHeaderButton";
import ProfileMain from "./ProfileMain";

type btnTextType = "Send Friend Request" | "Waiting for response" | "Remove from friends";

export default function UserProfile() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [relationshipStatus, setRelationshipStatus] = useState<RelationshipStatus | null>(null);
  const [btnText, setBtnText] = useState<btnTextType | null>(null);
  const [isShowPost, setIsShowPosts] = useState<boolean>(true);
  const [isMoreAbout, setIsMoreAbout] = useState<boolean>(false);


  const urlParams = useParams();
  const navigate = useNavigate();

  async function handleFetchUser() {
    if (!urlParams.id) {
      console.warn("Cannot fetch user details because id is undefined");
      return;
    }
    const response: UserResponse = await userService.findUser(urlParams.id);
    if (response && response?.success) {
      const { user, userProfile } = response;
      setRelationshipStatus(user.relationshipStatus);
      setFirstName(userProfile.firstName);
      setLastName(userProfile.lastName);
      const profilePicUrl = userProfile.profilePicture
        ? `data:image/png;base64,${userProfile.profilePicture}`
        : "/src/assets/default-profile-picture.png";
      setProfilePictureUrl(profilePicUrl);
    }
  }

  function chooseBtnText() {
    if (relationshipStatus != null) {
      if (relationshipStatus === "FRIEND") {
        setBtnText("Remove from friends");
      } else if (relationshipStatus === "STRANGER") {
        setBtnText("Send Friend Request");
      } else {
        console.warn("Problem occured with setting button text in UserProfile component");
      }
    }
  }

  useEffect(() => {
    handleFetchUser();
  }, []);

  useEffect(() => {
    chooseBtnText();
  }, [relationshipStatus]);

  async function handleSendFriendRequest(receiverId: string) {
    setBtnText("Waiting for response");

    await userService.sendFriendRequest(receiverId);
  }

  async function handleRemoveFromFriendList(friendId: string) {
    setBtnText("Send Friend Request");
    userService.removeFriendFromFriendList(friendId);
  }

  async function handleClickBtn() {
    if (!urlParams.id) {
      console.warn("Cannot fetch user details because id is undefined");
      return;
    } else if (relationshipStatus === "YOU") {
      console.warn('Relationship is mistakenly set - "YOU"');
      return;
    } else if (relationshipStatus === "STRANGER") {
      handleSendFriendRequest(urlParams.id);
    } else if (relationshipStatus === "FRIEND") {
      handleRemoveFromFriendList(urlParams.id);
    }
  }

  function handleGoOnHomePage() {
    navigate("/home")
  }

  function getUserIdFromUrlParams() {
    if (!urlParams.id) {
      console.warn("Cannot fetch user details because id is undefined");
      return -1;
    }
    return parseInt(urlParams.id);
  }

  function handleClickShowPosts() {
    setIsShowPosts(true);
    setIsMoreAbout(false);
  }

  function handleClickMoreAbout() {
    setIsMoreAbout(true);
    setIsShowPosts(false);
  }

  return (
    <div className={styles["profile"]}>
      <ProfileHeader firstName={firstName} lastName={lastName} profilePictureUrl={profilePictureUrl}>
        <ProfileHeaderButton text="Go to home page" handleClick={handleGoOnHomePage}/>
        <ProfileHeaderButton style={{ marginRight: "12rem" }} text={btnText} handleClick={handleClickBtn} />
      </ProfileHeader>
      <ProfileMain userId={getUserIdFromUrlParams()} isShowPosts={isShowPost} isMoreAbout={isMoreAbout}/>

      <aside className={styles["profile__left-aside"]}>
        <div className={`${styles["left-aside__show-posts"]}`} onClick={() => handleClickShowPosts()}>Show Posts</div>
        <div className={`${styles["left-aside__more-about"]}`} onClick={() => handleClickMoreAbout()}>More about {firstName} {lastName}</div>
      </aside>
    </div>
  );
}
