import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../../services/userService";
import { ProfilePrivacyLevel, RelationshipStatus, UserProfileConfig, UserResponse } from "../../types/user.types";
import css from "./profile.module.css";
import ProfileHeader from "./ProfileHeader";
import ProfileHeaderButton from "./ProfileHeaderButton";
import ProfileLeftAside from "./ProfileLeftAside";
import ProfileMain from "./ProfileMain";

type btnTextType = "Send Friend Request" | "Waiting for response" | "Remove from friends";

export default function UserProfile() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [relationshipStatus, setRelationshipStatus] = useState<RelationshipStatus | null>(null);
  const [user, setUser] = useState<UserResponse>();
  const [btnText, setBtnText] = useState<btnTextType | null>(null);
  const [isCurrentUserAbleToCheckProfile, setIsCurrentUserAbleToCheckProfile] = useState<boolean>(false);
  const [isShowPost, setIsShowPosts] = useState<boolean>(true);
  const [isShowFriends, setIsShowFriends] = useState<boolean>(false);
  const [isMoreAbout, setIsMoreAbout] = useState<boolean>(false);

  const { id: urlParamId } = useParams();
  const navigate = useNavigate();



  async function handleFetchUser() {
    if (!urlParamId) {
      console.warn("Cannot fetch user details because id is undefined");
      return;
    }
    const response: UserResponse = await userService.findUser(urlParamId);
    if (response && response?.success) {
      setUser(response);
      const { user, userProfile } = response;
      setRelationshipStatus(user.relationshipStatus);
      setFirstName(userProfile.firstName);
      setLastName(userProfile.lastName);
      const profilePicUrl = userProfile.profilePicture
        ? `data:image/png;base64,${userProfile.profilePicture}`
        : "/src/assets/default-profile-picture.png";
      setProfilePictureUrl(profilePicUrl);
      checkIfCurrentUserIsAbleToCheckProfile(user.relationshipStatus, response.userProfileConfig);
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

  function checkIfCurrentUserIsAbleToCheckProfile(relationshipStatus: RelationshipStatus, userProfileConfig: UserProfileConfig) {
    const profilePrivacyLevel: ProfilePrivacyLevel = userProfileConfig.profilePrivacyLevel;
    if (profilePrivacyLevel === "PUBLIC") {
      setIsCurrentUserAbleToCheckProfile(true);
    } else if (profilePrivacyLevel === "FRIENDS" && relationshipStatus === "FRIEND") {
      setIsCurrentUserAbleToCheckProfile(true);
    } else if (profilePrivacyLevel === "PRIVATE") {
      setIsCurrentUserAbleToCheckProfile(false);
    }
  }

  useEffect(() => {
    handleFetchUser();
  }, [urlParamId]);

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
    if (!urlParamId) {
      console.warn("Cannot fetch user details because id is undefined");
      return;
    } else if (relationshipStatus === "YOU") {
      console.warn('Relationship is mistakenly set - "YOU"');
      return;
    } else if (relationshipStatus === "STRANGER") {
      handleSendFriendRequest(urlParamId);
    } else if (relationshipStatus === "FRIEND") {
      handleRemoveFromFriendList(urlParamId);
    }
  }

  function handleGoOnHomePage() {
    navigate("/home");
  }

  return (
    <div className={`${css["profile"]}`}>
      <ProfileHeader firstName={firstName} lastName={lastName} profilePictureUrl={profilePictureUrl}>
        <ProfileHeaderButton text="Go to home page" handleClick={handleGoOnHomePage} />
        <ProfileHeaderButton style={{ marginRight: "12rem" }} text={btnText} handleClick={handleClickBtn} />
      </ProfileHeader>
      {isCurrentUserAbleToCheckProfile ? (
        <>
          <ProfileMain
            userId={urlParamId ? parseInt(urlParamId) : -1}
            user={user as UserResponse}
            isShowPosts={isShowPost}
            isShowFriends={isShowFriends}
            isMoreAbout={isMoreAbout}
          />
          <ProfileLeftAside
            handleSetIsShowPosts={setIsShowPosts}
            handleSetIsShowFriends={setIsShowFriends}
            handleSetIsMoreAbout={setIsMoreAbout}
            isSettingsComponentAvailable={false}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
