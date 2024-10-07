import { Chat, ChatMessage } from "../types/chat.types";
import { DataResult } from "../types/common.types";
import useFetchService, { UrlParameter } from "./useFetchService";

interface ChatService {
  createChat: (receiverId: number) => Promise<DataResult<Chat>>;
  findCurrentUserChats: () => Promise<DataResult<Chat[]>>;
  findChatMessages: (chatId: number) => Promise<DataResult<ChatMessage[]>>;
  findCurrentUserChatsWithNewMessages: () => Promise<DataResult<Chat[]>>;
  setSeenAllMessagesInChat: (chatId: number) => Promise<DataResult<any>>;
}

export default function useChatService(): ChatService {
  const { get, post, patch } = useFetchService();

  const URL = "http://localhost:8080/api/v1/chat";

  const createChat = (receiverId: number) => {
    return post(URL, { receiverId });
  };

  const setSeenAllMessagesInChat = (chatId: number) => {
    const finalUrl = URL + "/message/seenAll";
    const params: UrlParameter[] = [{ key: "chatId", value: chatId.toString() }];

    return patch(finalUrl, null, params);
  };

  const findCurrentUserChats = () => {
    return get(URL);
  };

  const findChatMessages = (chatId: number) => {
    const finalUrl = URL + "/message";
    const params: UrlParameter[] = [{ key: "chatId", value: chatId.toString() }];

    return get(finalUrl, params);
  };

  const findCurrentUserChatsWithNewMessages = () => {
    const finalUrl = URL + "/message/new";

    return get(finalUrl);
  };

  return {
    createChat,
    findCurrentUserChats,
    findChatMessages,
    findCurrentUserChatsWithNewMessages,
    setSeenAllMessagesInChat,
  };
}
