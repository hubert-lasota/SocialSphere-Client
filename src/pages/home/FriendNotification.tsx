import { useState } from "react";
import Button from "../../components/button/Button";
import useNavigateToUserProfile from "../../hooks/useNavigateToUserProfile";
import { FriendRequestResponse } from "../../types/user.types";
import getUserProfileImgSrc from "../../utils/getUserProfileImgSrc";
import userService from "../../services/userService";

type FriendNotificationProps = {
  notification: FriendRequestResponse;
};

export default function FriendNotification(props: FriendNotificationProps) {
  const { sender, status } = props.notification;
  const profilePictureSrc = getUserProfileImgSrc(sender.profilePicture);
  return (
    <>
      {status === "WAITING_FOR_RESPONSE" ? (
        <FriendRequestNotification
          id={props.notification.id}
          senderId={sender.userId}
          profilePictureSrc={profilePictureSrc}
          firstName={sender.firstName}
          lastName={sender.lastName}
        />
      ) : (
        <ResponseFriendNotification
          type={status === "ACCEPTED" ? "ACCEPTED" : "REJECTED"}
          senderId={sender.userId}
          profilePictureSrc={profilePictureSrc}
          firstName={sender.firstName}
          lastName={sender.lastName}
        />
      )}
    </>
  );
}

type ResponseFriendNotificationProps = {
  type: "ACCEPTED" | "REJECTED";
  senderId: number
  profilePictureSrc: string;
  firstName: string;
  lastName: string;
};

function ResponseFriendNotification(props: ResponseFriendNotificationProps) {
  const { senderId, profilePictureSrc, firstName, lastName, type } = props;
  const navigate = useNavigateToUserProfile();
  return (
    <div className="flex align-items-center column-gap-small">
      <img src={profilePictureSrc} alt="profile" className="profile-picture" style={{cursor: "pointer"}} onClick={() => navigate(senderId)}/>
      <span>
        {firstName + " " + lastName + " "}
        {type === "ACCEPTED" ? "accepted" : "rejected"} your friend request
      </span>
    </div>
  );
}

type FriendRequestNotificationProps = {
  id: number;
  senderId: number;
  profilePictureSrc: string;
  firstName: string;
  lastName: string;
};

function FriendRequestNotification(props: FriendRequestNotificationProps) {
  const { id, senderId, profilePictureSrc, firstName, lastName } = props;
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const [isRejected, setIsRejected] = useState<boolean>(false);
  const navigate = useNavigateToUserProfile();

  const rejectFriendRequest = () => {
    setIsRejected(true);
    userService.rejectFriendRequest(id);
  };

  const acceptFriendRequest = () => {
    setIsAccepted(true);
    userService.acceptFriendRequest(id);
  };

  const message = () => {
    if (isAccepted) {
      return `You accepted ${firstName} ${lastName} friend request`;
    } else if (isRejected) {
      return `You rejected ${firstName} ${lastName} friend request`;
    } else {
      return `${firstName} ${lastName} sent you a friend request`;
    }
  };

  return (
    <div className={"flex flex-column"}>
      <div className={"flex align-items-center column-gap-small"}>
        <img src={profilePictureSrc} alt="profile" className={"profile-picture"} style={{ cursor: "pointer" }} onClick={() => navigate(senderId)} />
        <span>{message()}</span>
      </div>
      {!isAccepted && !isRejected && (
        <div className="margin-inline-auto flex column-gap-small">
          <Button styleType="secondary" onClick={rejectFriendRequest}>
            Reject
          </Button>
          <Button styleType="primary" onClick={acceptFriendRequest}>
            Accept
          </Button>
        </div>
      )}
    </div>
  );
}
