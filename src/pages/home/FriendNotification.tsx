import { useState } from "react";
import Button from "../../components/button/Button";
import useNavigateToUserProfile from "../../hooks/useNavigateToUserProfile";
import useUserService from "../../services/useUserService";
import { FriendNotification as IFriendNotification } from "../../types/user.types";
import getUserProfileImgSrc from "../../utils/getUserProfileImgSrc";

type FriendNotificationProps = {
  notification: IFriendNotification;
};

export default function FriendNotification(props: FriendNotificationProps) {
  const { notification } = props;
  const { id, sender, status } = notification;

  const { firstName, lastName, profilePicture, userId: senderId } = sender;
  const profilePictureSrc = getUserProfileImgSrc(profilePicture);
  return (
    <>
      {status === "WAITING_FOR_RESPONSE" ? (
        <FriendRequestNotification id={id} senderId={senderId} profilePictureSrc={profilePictureSrc} firstName={firstName} lastName={lastName} />
      ) : (
        <RepliedFriendNotification
          type={status === "ACCEPTED" ? "ACCEPTED" : "REJECTED"}
          senderId={senderId}
          profilePictureSrc={profilePictureSrc}
          firstName={firstName}
          lastName={lastName}
        />
      )}
    </>
  );
}

type RepliedFriendNotificationProps = {
  type: "ACCEPTED" | "REJECTED";
  senderId: number;
  profilePictureSrc: string;
  firstName: string;
  lastName: string;
};

function RepliedFriendNotification(props: RepliedFriendNotificationProps) {
  const { type, senderId, profilePictureSrc, firstName, lastName } = props;

  const navigate = useNavigateToUserProfile();
  return (
    <div className="flex align-items-center column-gap-small">
      <img src={profilePictureSrc} alt="profile" className="profile-picture" style={{ cursor: "pointer" }} onClick={() => navigate(senderId)} />
      <span>
        <span style={{ fontWeight: "500" }}>{firstName + " " + lastName + " "}</span>
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

  return (
    <div className={"flex flex-column"}>
      <div className={"flex align-items-center column-gap-small"}>
        <img src={profilePictureSrc} alt="profile" className={"profile-picture"} style={{ cursor: "pointer" }} onClick={() => navigate(senderId)} />
        <span>{<Message name={firstName + " " + lastName} isAccepted={isAccepted} isRejected={isRejected} />}</span>
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

const Message = ({ name, isAccepted, isRejected }: { name: string; isAccepted: boolean; isRejected: boolean }) => {
  const nameEl = <span style={{ fontWeight: 500 }}>{name}</span>;
  if (isAccepted) {
    return (
      <>
        {"You accepted "} 
        {nameEl}
        {" friend request"}
      </>
    );
  } else if (isRejected) {
    return <>You rejected {nameEl} friend request</>;
  } else {
    return <>{nameEl} sent you a friend request</>;
  }
};
