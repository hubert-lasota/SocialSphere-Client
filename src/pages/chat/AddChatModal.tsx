import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import useUserService from "../../services/useUserService";
import { UserWithProfile } from "../../types/user.types";
import getUserProfileImgSrc from "../../utils/getUserProfileImgSrc";
import css from "./chat.module.css";

type AddChatModalProps = {
  onAddChat: (receiverId: number) => void;
};

export default function AddChatModal(props: AddChatModalProps) {
  const { onAddChat } = props;
  const [friends, setFriends] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userService = useUserService();

  useEffect(() => {
    userService
      .findMyFriendsWithNoSharedChats()
      .then((response) => {
        if (response.success) {
          setFriends(response.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={css["add-chat-modal"]}>
      {friends.length === 0 && (
        <div style={{ textAlign: "center", marginBlock: "auto", fontSize: "1.3rem", fontWeight: 500 }}>You have chat with all Your friends.</div>
      )}
      <div className={`flex flex-column row-gap-small ${css["add-chat-modal__friends-list"]}`}>
        {friends.map((friend) => {
          const profile = friend.userProfile;
          return (
            <div className="flex column-gap-small align-items-center" onClick={() => onAddChat(friend.user.id)}>
              <img src={getUserProfileImgSrc(profile.profilePicture)} className="profile-picture" />
              <div>
                <span>{profile.firstName + " "} </span>
                <span>{profile.lastName}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
