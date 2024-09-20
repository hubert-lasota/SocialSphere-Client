import { createContext, useContext } from "react";
import { Chat, ChatMessage } from "../../types/chat.types";
import { UserHeader } from "../../types/user.types";

type ChatContextValue = {
  subscribedMessages: ChatMessage[];
  chats: Chat[];
  currentChat: Chat | undefined;
  setCurrentChat: (chat: Chat) => void;
  chatsWithNewMessages: Chat[];
  sendMessage: ((chatId: number, content: string) => void) | undefined;
  currentUser: UserHeader;
  setSeenMessagesInChat: (chatId: number) => void
  addChat: (receiverId: number) => void
};

export const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext should be only used inside Chat component");
  }

  return context;
}
