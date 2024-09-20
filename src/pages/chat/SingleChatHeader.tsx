import { BiSolidMessageError } from "react-icons/bi";
import css from "./chat.module.css";

type SingleChatHeaderProps = {
  firstName: string;
  lastName: string;
  profilePicture: string;
  isCurrentChat: boolean;
  onSetCurrentChat: () => void;
  isNewMessage: boolean;
};

export default function SingleChatHeader(props: SingleChatHeaderProps) {
  const { firstName, lastName, profilePicture, isCurrentChat, onSetCurrentChat, isNewMessage } = props;
  const focusClassName = isCurrentChat ? css["left-aside__chat-focus"] : "";

  return (
    <div className={`${css["left-aside__chat"]} ${focusClassName}`} onClick={onSetCurrentChat}>
      <img src={profilePicture} alt="profile" className="profile-picture margin-left-small" />
      <div className="flex column-gap-xs">
        <div className="flex column-gap-xs">
          <span>{firstName}</span>
          <span>{lastName}</span>
        </div>
        {isNewMessage && (
          <div style={{fontSize: "1.2rem", marginLeft: "0.4rem"}}>
            <BiSolidMessageError />
          </div>
        )}
      </div>
    </div>
  );
}
