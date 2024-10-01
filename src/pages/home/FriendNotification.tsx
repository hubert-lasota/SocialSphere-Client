import { useState } from "react";
import Button from "../../components/button/Button";
import useLocalStorage from "../../hooks/useLocalStorage";
import useNavigateToUserProfile from "../../hooks/useNavigateToUserProfile";
import useUserService from "../../services/useUserService";
import { FriendRequestResponse, UserHeader } from "../../types/user.types";
import getUserProfileImgSrc from "../../utils/getUserProfileImgSrc";

type FriendNotificationProps = {
  notification: FriendRequestResponse;
};

export default function FriendNotification(props: FriendNotificationProps) {
  const {notification} = props
  const { sender, receiver, status } = notification;
  
  return (
    <>
      {status === "WAITING_FOR_RESPONSE" ? (
        <FriendRequestNotification
          id={props.notification.id}
          senderId={sender.userId}
          profilePictureSrc={getUserProfileImgSrc(sender.profilePicture)}
          firstName={sender.firstName}
          lastName={sender.lastName}
        />
      ) : (
        <ResponseFriendNotification type={status === "ACCEPTED" ? "ACCEPTED" : "REJECTED"} sender={sender} receiver={receiver} />
      )}
    </>
  );
}

type ResponseFriendNotificationProps = {
  type: "ACCEPTED" | "REJECTED";
  sender: UserHeader;
  receiver: UserHeader;
};

function ResponseFriendNotification(props: ResponseFriendNotificationProps) {
  const { type, sender, receiver } = props;
  const [currentUserId] = useLocalStorage("user_id");

  let firstName;
  let lastName;
  let profilePictureSrc;
  let userId;
  if (receiver.userId === currentUserId) {
    firstName = sender.firstName;
    lastName = sender.lastName;
    profilePictureSrc = getUserProfileImgSrc(sender.profilePicture);
    userId = sender.userId;
  } else {
    firstName = receiver.firstName;
    lastName = receiver.lastName;
    profilePictureSrc = getUserProfileImgSrc(receiver.profilePicture);
    userId = receiver.userId;
  }

  const navigate = useNavigateToUserProfile();
  return (
    <div className="flex align-items-center column-gap-small">
      <img src={profilePictureSrc} alt="profile" className="profile-picture" style={{ cursor: "pointer" }} onClick={() => navigate(userId)} />
      <span>
        <span style={{ fontWeight: "bold" }}>{firstName + " " + lastName + " "}</span>
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
  const userService = useUserService();
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
