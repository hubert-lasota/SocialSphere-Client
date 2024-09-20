import useLocalStorage from "../../hooks/useLocalStorage";
import { UserHeader } from "../../types/user.types";
import getUserProfileImgSrc from "../../utils/getUserProfileImgSrc";
import css from "./chat.module.css";
import { useChatContext } from "./ChatContext";
import SingleChatHeader from "./SingleChatHeader";

export default function LeftAside() {
  const [userId] = useLocalStorage("user_id", "");
  const { chats, currentChat, setCurrentChat } = useChatContext();

  return (
    <aside className={css["left-aside"]}>
      <div className={css["left-aside__header"]}>Chats</div>
      {chats?.map((ch) => {
        const u: UserHeader = ch.user.userId === userId ? ch.createdBy : ch.user;
        return (
          <SingleChatHeader
            key={ch.id}
            firstName={u.firstName}
            lastName={u.lastName}
            profilePicture={getUserProfileImgSrc(u.profilePicture)}
            isCurrentChat={ch.id === currentChat?.id}
            onSetCurrentChat={() => setCurrentChat(ch)}
            isNewMessage={ch.hasNotSeenMessages}
          />
        );
      })}
    </aside>
  );
}
