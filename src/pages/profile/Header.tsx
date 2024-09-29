import { ReactNode, useEffect, useState } from "react";
import { FaUserMinus, FaUserPlus } from "react-icons/fa6";
import Button from "../../components/button/Button";
import HomeNavigateButton from "../../components/HomeNavigateButton";
import Loading from "../../components/loading/Loading";
import userService from "../../services/userService";
import { FriendRequestResponse } from "../../types/user.types";
import getUserProfileImgSrc from "../../utils/getUserProfileImgSrc";
import css from "./profile.module.css";
import { useProfileContext } from "./ProfileContext";

type HeaderProps = {
  children: ReactNode;
};

export default function Header(props: HeaderProps) {
  const { children } = props;
  const { userProfile } = useProfileContext();
  return (
    <header className={css["header"]}>
      <div className={"flex align-items-center column-gap-small " + css["header__left-side"]}>
        <img src={getUserProfileImgSrc(userProfile.profilePicture)} alt="profile" className={css["header__profile-picture"]} />
        <span style={{ fontWeight: 500, fontSize: "1.3rem" }}>{userProfile.firstName + " " + userProfile.lastName}</span>
      </div>
      <div className={css["header__right-side"]}>{children}</div>
    </header>
  );
}

Header.FriendResponseButton = function HeaderFriendResponseButton() {
  const { user, userProfile } = useProfileContext();
  const [friendRequest, setFriendRequest] = useState<FriendRequestResponse | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [isReplied, setIsReplied] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    userService
      .findUserFriendRequestForCurrentUser(user.id)
      .then((response) => {
        if (response.success) {
          setFriendRequest(response.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const rejectFriendRequest = () => {
    if (!friendRequest) {
      throw new Error("There is no friend request for current user on this profile.");
    }
    userService.rejectFriendRequest(friendRequest.id).finally(() => {
      window.location.reload();
      setIsReplied(true);
    });
  };

  const acceptFriendRequest = () => {
    if (!friendRequest) {
      throw new Error("There is no friend request for current user on this profile.");
    }

    userService.acceptFriendRequest(friendRequest.id).finally(() => {
      window.location.reload();
      setIsReplied(true);
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (isReplied) {
    return <></>;
  }

  return (
    <div className="margin-inline-auto flex align-items-center column-gap-small">
      <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{userProfile.firstName} sent you friend request: </span>
      <Button styleType="secondary" onClick={rejectFriendRequest}>
        Reject
      </Button>
      <Button styleType="primary" onClick={acceptFriendRequest}>
        Accept
      </Button>
    </div>
  );
};

Header.FriendButton = function HeaderFriendButton() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState<boolean>(true);
  const { user } = useProfileContext();
  const { relationshipStatus } = user;

  useEffect(() => {
    userService
      .isCurrentUserWaitingForFriendResponse(user.id)
      .then((response) => {
        if (response.success) {
          setIsWaitingForResponse(response.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const addFriend = () => {
    userService.sendFriendRequest(user.id).then((response) => {
      if (response.success) {
        setIsWaitingForResponse(true);
      }
    });
  };

  const removeFriend = () => {
    userService
      .removeFriendFromFriendList(user.id)
      .then((response) => {
        if (response.success) {
          setIsWaitingForResponse(true);
        }
      })
     // .finally(() => window.location.reload());
  };

  if (loading) {
    return <Loading />;
  }

  if (relationshipStatus === "YOU" || isWaitingForResponse) {
    return <></>;
  }

  return (
    <>
      {relationshipStatus === "STRANGER" ? (
        <div onClick={addFriend} className={css["header__btn"]}>
          <FaUserPlus />
        </div>
      ) : (
        <div onClick={removeFriend} className={css["header__btn"]}>
          <FaUserMinus />
        </div>
      )}
    </>
  );
};

Header.HomeNavigateButton = function HeaderHomeNavigateButton() {
  return <HomeNavigateButton additionalClassName={css["header__btn"]} />;
};
