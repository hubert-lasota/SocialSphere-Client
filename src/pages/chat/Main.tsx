import { useEffect, useMemo, useRef, useState } from "react";
import Loading from "../../components/loading/Loading";
import useLocalStorage from "../../hooks/useLocalStorage";
import filterDuplicateElementsInArray from "../../utils/filterDuplicateElementsInArray";
import getUserProfileImgSrc from "../../utils/getUserProfileImgSrc";
import css from "./chat.module.css";
import { useChatContext } from "./ChatContext";
import Message from "./Message";
import useFetchChatMessages from "./useFetchChatMessages";

export default function Main() {
  const { subscribedMessages, sendMessage, currentChat, setSeenMessagesInChat } = useChatContext();
  const [currentUserid] = useLocalStorage("user_id", "");
  const [content, setContent] = useState<string>("");
  const mainRef = useRef<HTMLDivElement>(null);
  const { messages, loading } = useFetchChatMessages(currentChat?.id);

  const filteredMessages = useMemo(
    () => filterDuplicateElementsInArray([...messages, ...subscribedMessages], (mess1, mess2) => mess1.id !== mess2.id),
    [messages, subscribedMessages]
  );

  const clickEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage?.(currentChat?.id || -1, content);
      setContent("");
    }
  };

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }
  }, [filteredMessages]);

  useEffect(() => {
    if (currentChat) {
      setSeenMessagesInChat(currentChat.id);
    }
  }, [currentChat, subscribedMessages]);

  if (loading) {
    return (
      <main className={`${css["main"]} flex justify-content-center align-items-center`}>
        <Loading additionalStyle={{ width: "8%" }} />
      </main>
    );
  }

  if (!currentChat) {
    return (
      <main className={css["main"]}>
        <div style={{ height: "100%" }} className="flex justify-content-center align-items-center">
          <span style={{ fontSize: "2.3rem", fontWeight: 500, userSelect: "none" }}>[Select chat!]</span>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className={css["main"]} ref={mainRef}>
        <div className={css["main__messages"]}>
          {filteredMessages.map((mess) => {
            return mess.chatId === currentChat.id ? (
              <Message
                key={mess.id}
                profilePictureSrc={getUserProfileImgSrc(mess.sender.profilePicture)}
                content={mess.content}
                isSender={currentUserid === mess.sender.userId}
              />
            ) : (
              <></>
            );
          })}
        </div>
      </main>
      <div className={css["main__add-message"]}>
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} onKeyDown={clickEnter} placeholder="Send message!" />
      </div>
    </>
  );
}
