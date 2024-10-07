import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import useFetchCurrentUserHeader from "../../hooks/useFetchCurrentUserHeader";
import useChatService from "../../services/useChatService";
import { Chat as IChat } from "../../types/chat.types";
import { ChatContext } from "./ChatContext";
import Header from "./Header";
import LeftAside from "./LeftAside";
import Main from "./Main";
import css from "./chat.module.css";
import useFetchChatsWithNewMessages from "./useFetchChatsWithNewMessages";
import useFetchCurrentUserChats from "./useFetchCurrentUserChats";
import useSubscribeAndSendMessages from "./useSubscribeAndSendMessages";

export default function Chat() {
  const { subscribedMessages, sendMessage } = useSubscribeAndSendMessages();
  const { chats, setChats, loading: chatsLoading } = useFetchCurrentUserChats();
  const { chatsWithNewMessages, loading: chatIdsWithNewMessageLoading } = useFetchChatsWithNewMessages();
  const { currentUser, loading: currentUserLoading } = useFetchCurrentUserHeader();
  const [currentChat, setCurrentChat] = useState<IChat | undefined>(chats?.[0]);
  const chatService = useChatService();

  useEffect(() => {
    let didUpdate = false;
    subscribedMessages.forEach((mess) => {
      const chat = chats.find((ch) => ch.id === mess.chatId);
      if (chat) {
        const mess = subscribedMessages[subscribedMessages.length - 1];
        if (mess.sender.userId !== currentUser.userId) {
          chat.hasNotSeenMessages = true;
          didUpdate = true;
        }
      }

      if (didUpdate) setChats([...chats]);
    });
  }, [subscribedMessages]);

  const handleSeenMessagesInChat = (chatId: number) => {
    chatService.setSeenAllMessagesInChat(chatId);
    const chat = chats.find((ch) => ch.id === chatId);

    if (chat && chat.hasNotSeenMessages) {
      chat.hasNotSeenMessages = false;
      setChats([...chats]);
    }
  };

  const handleSetCurrentChat = (chat: IChat) => {
    if (chat.id === currentChat?.id) return;
    setCurrentChat(chat);
  };

  const handleAddChat = (receiverId: number) => {
    chatService.createChat(receiverId).then((response) => {
      if (response.success) {
        setChats([response.data, ...chats]);
      }
    });
  };

  if (chatsLoading || chatIdsWithNewMessageLoading || currentUserLoading) {
    return <Loading pageLoading={true} />;
  }

  return (
    <ChatContext.Provider
      value={{
        subscribedMessages,
        currentChat,
        chats,
        setCurrentChat: handleSetCurrentChat,
        chatsWithNewMessages,
        sendMessage,
        currentUser,
        setSeenMessagesInChat: handleSeenMessagesInChat,
        addChat: handleAddChat,
      }}
    >
      <div className={css["chat"]}>
        <Header />
        <LeftAside />
        <Main />
      </div>
    </ChatContext.Provider>
  );
}
