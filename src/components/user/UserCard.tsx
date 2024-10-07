import { ReactNode } from "react";
import useNavigateToUserProfile from "../../hooks/useNavigateToUserProfile";
import { UserWithProfile } from "../../types/user.types";
import getUserProfileImgSrc from "../../utils/getUserProfileImgSrc";
import css from "./user.module.css";
import { UserContext, useUserContext } from "./UserContext";

type UserCardProps = {
  userWithProfile: UserWithProfile;
  profile?: ReactNode;
  details?: ReactNode;
};

export default function UserCard(props: UserCardProps) {
  const { userWithProfile, profile, details } = props;
  const navigate = useNavigateToUserProfile();
  return (
    <UserContext.Provider value={{ userWithProfile }}>
      <div
        className={css["user"]}
        onClick={() => {
          navigate(userWithProfile.user.id);
          window.location.reload();
        }}
      >
        {profile}
        <div className={css["user-container"]}>{details}</div>
      </div>
    </UserContext.Provider>
  );
}

UserCard.Profile = function UserCardProfile() {
  const {
    userWithProfile: { userProfile },
  } = useUserContext();

  return <img src={getUserProfileImgSrc(userProfile.profilePicture)} alt="profile" className={css["user__profile"]} />;
};

UserCard.Name = function UserCardName() {
  const {
    userWithProfile: { userProfile },
  } = useUserContext();

  return <div className={css["name"]}>{userProfile.firstName + " " + userProfile.lastName}</div>;
};

UserCard.From = function UserCardFrom() {
  const {
    userWithProfile: { userProfile },
  } = useUserContext();

  return <div className={css["from"]}>From {userProfile.city + ", " + userProfile.country}</div>;
};

UserCard.RelationshipStatus = function UserCardRelationshipStatus() {
  const {
    userWithProfile: { user },
  } = useUserContext();

  return <div className={css["relationship-status"]}>{user.relationshipStatus}</div>;
};
