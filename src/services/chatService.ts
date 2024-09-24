import { Chat, ChatMessage } from "../types/chat.types";
import { DataResult } from "../types/common.types";
import fetchService, { UrlParameter } from "./fetchService";

interface ChatService {
  createChat: (receiverId: number) => Promise<DataResult<Chat>>;
  findCurrentUserChats: () => Promise<DataResult<Chat[]>>;
  findChatMessages: (chatId: number) => Promise<DataResult<ChatMessage[]>>;
  findCurrentUserChatsWithNewMessages: () => Promise<DataResult<Chat[]>>;
  setSeenAllMessagesInChat: (chatId: number) => Promise<DataResult<any>>;
}

const URL = "http://localhost:8080/api/v1/chat";

function createChat(receiverId: number) {
  return fetchService.post(URL, { receiverId });
}

function setSeenAllMessagesInChat(chatId: number) {
  const finalUrl = URL + "/message/seenAll";
  const params: UrlParameter[] = [{ key: "chatId", value: chatId.toString() }];

  return fetchService.patch(finalUrl, null, params);
}

function findCurrentUserChats() {
  return fetchService.get(URL);
}

function findChatMessages(chatId: number) {
  const finalUrl = URL + "/message";
  const params: UrlParameter[] = [{ key: "chatId", value: chatId.toString() }];

  return fetchService.get(finalUrl, params);
}

function findCurrentUserChatsWithNewMessages() {
  const finalUrl = URL + "/message/new";

  return fetchService.get(finalUrl);
}

const chatService: ChatService = {
  createChat,
  findCurrentUserChats,
  findChatMessages,
  findCurrentUserChatsWithNewMessages,
  setSeenAllMessagesInChat,
};

export default chatService;
